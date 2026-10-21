import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { germanWords, physicsTerms, type PhysicsTerm } from './homework';

type Subject = 'home' | 'german' | 'physics';
type PhysicsMode = 'match' | 'write';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main class="page-shell">
      <header class="topbar">
        <button class="brand" (click)="goHome()" aria-label="Till startsidan"><span class="brand-mark">e.</span><span>ellies läxhörna</span></button>
        <span class="week-pill"><span class="dot"></span> Vecka 43</span>
      </header>

      @if (subject() === 'home') {
        <section class="welcome">
          <div><p class="eyebrow">HEJ ELLIE <span>✳</span></p><h1>Veckans läxa,<br>i din <em>egen takt.</em></h1><p class="intro">Välj ett ämne och öva på det du har lärt dig.</p></div>
          <div class="welcome-art"><img class="hero-portrait" src="ellie-football.png" alt="Ellie med sin fotbollspokal under en regnbåge"></div>
        </section>
        <section class="section-heading"><div><p class="eyebrow">VECKA 43</p><h2>Vad vill du öva på?</h2></div><span class="count">2 ämnen</span></section>
        <section class="subject-grid" aria-label="Välj läxämne">
          <button class="subject-card peach" (click)="openGerman()"><span class="subject-icon">Aa</span><span class="subject-label">TYSKA · GLosor</span><strong>Veckodagarna</strong><span class="subject-hint">Skriv det tyska ordet</span><span class="subject-link">Öva tyska <i>↗</i></span></button>
          <button class="subject-card blue" (click)="openPhysics()"><span class="subject-icon">✳</span><span class="subject-label">FYSIK · KRAFT OCH RÖRELSE</span><strong>Begrepp & förklaringar</strong><span class="subject-hint">Para ihop eller skriv själv</span><span class="subject-link">Öva fysik <i>↗</i></span></button>
        </section>
        <aside class="cheer"><span class="cheer-star">✳</span><p><strong>Ta en sak i taget.</strong> Du kan alltid komma tillbaka och öva mer.</p><span class="cheer-heart">♡</span></aside>
      }

      @if (subject() === 'german') {
        <section class="study-page">
          <button class="back-button" (click)="goHome()">← Alla veckans ämnen</button>
          <div class="study-heading"><div><p class="eyebrow">VECKA 43 · TYSKA</p><h1>Veckodagarna</h1><p class="intro">Skriv det tyska ordet som passar till varje svensk ledtråd.</p></div><span class="heading-icon peach">Aa</span></div>
          <div class="mode-note">✦ <span>Svaren kommer i olika ordning varje gång.</span></div>
          <div class="answer-sheet german-sheet">
            @for (item of germanQuestions(); track item.swedish; let i = $index) {
              <label class="answer-row" [class.right-row]="germanChecked() && isGermanCorrect(item)" [class.wrong-row]="germanChecked() && !isGermanCorrect(item)">
                <span class="row-number">{{ i + 1 }}</span><span class="prompt-text">{{ item.swedish }}</span>
                <input type="text" [(ngModel)]="germanAnswers()[item.swedish]" [disabled]="germanChecked()" [attr.aria-label]="'Skriv på tyska: ' + item.swedish" placeholder="Skriv på tyska…" lang="de" autocomplete="off" autocapitalize="none" spellcheck="false">
                @if (germanChecked()) { <span class="mark-icon">{{ isGermanCorrect(item) ? '✓' : '↻' }}</span> }
              </label>
              @if (germanChecked() && !isGermanCorrect(item)) { <p class="correct-answer">Rätt svar: <strong>{{ item.german }}</strong></p> }
            }
          </div>
          @if (!germanChecked()) {
            <div class="submit-row"><span class="help-note">Tips: På iPad kan du skriva med Apple Pencil i svarsfälten.</span><button class="primary-button" (click)="checkGerman()">Klar – rätta alla <span>✓</span></button></div>
          } @else {
            <div class="result-banner"><span>{{ germanScore() === germanQuestions().length ? '🎉' : '🌟' }}</span><p><strong>{{ germanScore() }} av {{ germanQuestions().length }} rätt!</strong> {{ germanScore() === germanQuestions().length ? 'Allihop satt!' : 'Bra övat – testa igen när du vill.' }}</p><button class="secondary-button" (click)="openGerman()">Öva igen</button></div>
          }
        </section>
      }

      @if (subject() === 'physics') {
        <section class="study-page physics-page">
          <button class="back-button" (click)="goHome()">← Alla veckans ämnen</button>
          <div class="study-heading"><div><p class="eyebrow">VECKA 43 · FYSIK</p><h1>Kraft och rörelse</h1><p class="intro">Välj hur du vill träna begreppen.</p></div><span class="heading-icon blue">✳</span></div>
          <div class="mode-tabs" role="tablist" aria-label="Välj övningsläge">
            <button [class.active]="physicsMode() === 'match'" (click)="setPhysicsMode('match')"><span>01</span> Para ihop</button>
            <button [class.active]="physicsMode() === 'write'" (click)="setPhysicsMode('write')"><span>02</span> Skriv begreppet</button>
          </div>
          @if (physicsMode() === 'match') {
            <p class="mode-description">Välj rätt förklaring till varje begrepp. Du kan ändra svaren innan du rättar.</p>
            <div class="match-list">
              @for (term of shuffledPhysics(); track term.term; let i = $index) {
                <label class="match-row" [class.right-row]="physicsChecked() && matchAnswers()[term.term] === term.term" [class.wrong-row]="physicsChecked() && matchAnswers()[term.term] !== term.term">
                  <span class="row-number">{{ i + 1 }}</span><img class="physics-illustration" [src]="'physics/' + term.image" alt=""><strong>{{ term.term }}</strong>
                  <select [(ngModel)]="matchAnswers()[term.term]" [disabled]="physicsChecked()" [attr.aria-label]="'Förklaring för ' + term.term">
                    <option value="">Välj en förklaring…</option>
                    @for (option of shuffledPhysics(); track option.term) { <option [value]="option.term">{{ option.definition }}</option> }
                  </select>
                  @if (physicsChecked()) { <span class="mark-icon">{{ matchAnswers()[term.term] === term.term ? '✓' : '↻' }}</span> }
                </label>
                @if (physicsChecked() && matchAnswers()[term.term] !== term.term) { <p class="correct-answer match-correction">Rätt förklaring: <strong>{{ term.definition }}</strong></p> }
              }
            </div>
            @if (physicsChecked()) { <div class="result-banner"><span>{{ physicsScore() === shuffledPhysics().length ? '🎉' : '🌟' }}</span><p><strong>{{ physicsScore() }} av {{ shuffledPhysics().length }} rätt!</strong> {{ physicsScore() === shuffledPhysics().length ? 'Du kan begreppen!' : 'Titta på rätt svar och öva vidare.' }}</p><button class="secondary-button" (click)="resetPhysics()">Börja om</button></div> }
            @else { <div class="submit-row"><span class="help-note">Alla svar rättas på en gång.</span><button class="primary-button" (click)="checkPhysics()">Klar – rätta alla <span>✓</span></button></div> }
          } @else {
            <p class="mode-description">Läs förklaringen och skriv vilket fysikbegrepp som passar.</p>
            <div class="answer-sheet physics-write-sheet">
              @for (term of shuffledPhysics(); track term.term; let i = $index) {
                <label class="definition-row" [class.right-row]="physicsChecked() && isPhysicsCorrect(term)" [class.wrong-row]="physicsChecked() && !isPhysicsCorrect(term)">
                  <span class="row-number">{{ i + 1 }}</span><img class="physics-illustration" [src]="'physics/' + term.image" alt=""><span class="definition-text">{{ term.definition }}</span>
                  <input type="text" [(ngModel)]="physicsAnswers()[term.term]" [disabled]="physicsChecked()" [attr.aria-label]="'Skriv begreppet för: ' + term.definition" placeholder="Skriv begreppet…" autocomplete="off" autocapitalize="none" spellcheck="false">
                  @if (physicsChecked()) { <span class="mark-icon">{{ isPhysicsCorrect(term) ? '✓' : '↻' }}</span> }
                </label>
                @if (physicsChecked() && !isPhysicsCorrect(term)) { <p class="correct-answer">Rätt begrepp: <strong>{{ term.term }}</strong></p> }
              }
            </div>
            @if (physicsChecked()) { <div class="result-banner"><span>{{ physicsScore() === shuffledPhysics().length ? '🎉' : '🌟' }}</span><p><strong>{{ physicsScore() }} av {{ shuffledPhysics().length }} rätt!</strong> {{ physicsScore() === shuffledPhysics().length ? 'Du kan begreppen!' : 'Bra övat – testa igen när du vill.' }}</p><button class="secondary-button" (click)="resetPhysics()">Öva igen</button></div> }
            @else { <div class="submit-row"><span class="help-note">Skriv så många svar du kan.</span><button class="primary-button" (click)="checkPhysics()">Klar – rätta alla <span>✓</span></button></div> }
          }
        </section>
      }
      <footer>GJORD MED <span>♥</span> FÖR ELLIE</footer>
    </main>
  `
})
export class App {
  readonly subject = signal<Subject>('home');
  readonly physicsMode = signal<PhysicsMode>('match');
  readonly germanQuestions = signal([...germanWords]);
  readonly shuffledPhysics = signal(this.shuffle(physicsTerms));
  readonly germanAnswers = signal<Record<string, string>>({});
  readonly matchAnswers = signal<Record<string, string>>({});
  readonly physicsAnswers = signal<Record<string, string>>({});
  readonly germanChecked = signal(false);
  readonly physicsChecked = signal(false);
  readonly germanScore = signal(0);
  readonly physicsScore = signal(0);

  goHome(): void { this.subject.set('home'); }

  openGerman(): void {
    this.germanQuestions.set(this.shuffle(germanWords));
    this.germanAnswers.set({});
    this.germanChecked.set(false);
    this.germanScore.set(0);
    this.subject.set('german');
  }

  openPhysics(): void {
    this.resetPhysics();
    this.subject.set('physics');
  }

  setPhysicsMode(mode: PhysicsMode): void {
    this.physicsMode.set(mode);
    this.resetPhysics();
  }

  resetPhysics(): void {
    this.shuffledPhysics.set(this.shuffle(physicsTerms));
    this.matchAnswers.set({});
    this.physicsAnswers.set({});
    this.physicsChecked.set(false);
    this.physicsScore.set(0);
  }

  checkGerman(): void {
    this.germanScore.set(this.germanQuestions().filter((item) => this.isGermanCorrect(item)).length);
    this.germanChecked.set(true);
  }

  isGermanCorrect(item: typeof germanWords[number]): boolean {
    return this.normalize(this.germanAnswers()[item.swedish] ?? '') === this.normalize(item.german);
  }

  checkPhysics(): void {
    const terms = this.shuffledPhysics();
    const correct = this.physicsMode() === 'match'
      ? terms.filter((term) => this.matchAnswers()[term.term] === term.term).length
      : terms.filter((term) => this.isPhysicsCorrect(term)).length;
    this.physicsScore.set(correct);
    this.physicsChecked.set(true);
  }

  isPhysicsCorrect(term: PhysicsTerm): boolean {
    const answer = this.normalize(this.physicsAnswers()[term.term] ?? '');
    return [term.term, ...(term.aliases ?? [])].some((candidate) => this.normalize(candidate) === answer);
  }

  private normalize(value: string): string {
    return value.toLocaleLowerCase('sv-SE').trim().replace(/\s+/g, ' ').replace(/[.,;:!?]/g, '');
  }

  private shuffle<T>(items: T[]): T[] {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
    }
    return shuffled;
  }
}
