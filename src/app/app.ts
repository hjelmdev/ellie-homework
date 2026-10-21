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
          <div><p class="eyebrow">HEJ ELLIE <svg class="sparkle-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5 14.8 9l6.7 3-6.7 2.9L12 21.5l-2.8-6.6L2.5 12l6.7-3L12 2.5Z"/></svg></p><h1>Veckans läxa,<br>i din <em>egen takt.</em></h1><p class="intro">Välj ett ämne och öva på det du har lärt dig.</p></div>
          <div class="welcome-art"><img class="hero-portrait" src="ellie-football.png" alt="Ellie med sin fotbollspokal under en regnbåge"></div>
        </section>
        <section class="section-heading"><div><p class="eyebrow">VECKA 43</p><h2>Vad vill du öva på?</h2></div><span class="count">2 ämnen</span></section>
        <section class="subject-grid" aria-label="Välj läxämne">
          <button class="subject-card peach" (click)="openGerman()"><span class="subject-icon">Aa</span><span class="subject-label">TYSKA · GLOSOR</span><strong>Veckodagarna</strong><span class="subject-hint">Skriv det tyska ordet</span><span class="subject-link">Öva tyska <svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></span></button>
          <button class="subject-card blue" (click)="openPhysics()"><span class="subject-icon"><svg class="sparkle-icon subject-sparkle" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5 14.8 9l6.7 3-6.7 2.9L12 21.5l-2.8-6.6L2.5 12l6.7-3L12 2.5Z"/></svg></span><span class="subject-label">FYSIK · KRAFT OCH RÖRELSE</span><strong>Begrepp & förklaringar</strong><span class="subject-hint">Para ihop eller skriv själv</span><span class="subject-link">Öva fysik <svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></span></button>
        </section>
        <aside class="cheer"><svg class="cheer-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5 14.8 9l6.7 3-6.7 2.9L12 21.5l-2.8-6.6L2.5 12l6.7-3L12 2.5Z"/></svg><p><strong>Ta en sak i taget.</strong> Du kan alltid komma tillbaka och öva mer.</p><svg class="cheer-heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 8.8c0 5-8.5 11-8.5 11s-8.5-6-8.5-11a4.3 4.3 0 0 1 8.5-1 4.3 4.3 0 0 1 8.5 1Z"/></svg></aside>
      }

      @if (subject() === 'german') {
        <section class="study-page">
          <button class="back-button" (click)="goHome()"><svg class="arrow-icon back-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m7 7-7-7 7-7"/></svg> Alla veckans ämnen</button>
          <div class="study-heading"><div><p class="eyebrow">VECKA 43 · TYSKA</p><h1>Veckodagarna</h1><p class="intro">Skriv det tyska ordet som passar till varje svensk ledtråd.</p></div><span class="heading-icon peach">Aa</span></div>
          <div class="mode-note"><svg class="sparkle-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5 14.8 9l6.7 3-6.7 2.9L12 21.5l-2.8-6.6L2.5 12l6.7-3L12 2.5Z"/></svg><span>Svaren kommer i olika ordning varje gång.</span></div>
          <div class="answer-sheet german-sheet">
            @for (item of germanQuestions(); track item.swedish; let i = $index) {
              <div class="answer-row" [class.right-row]="germanChecks()[item.swedish] === true" [class.wrong-row]="germanChecks()[item.swedish] === false">
                <span class="row-number">{{ i + 1 }}</span><span class="prompt-text">{{ item.swedish }}</span>
                <div class="answer-entry"><input type="text" [(ngModel)]="germanAnswers()[item.swedish]" (ngModelChange)="germanAnswerChanged(item)" [disabled]="germanChecks()[item.swedish] === true" [attr.aria-label]="'Skriv på tyska: ' + item.swedish" placeholder="Skriv på tyska…" lang="de" autocomplete="off" autocapitalize="none" spellcheck="false"><button class="row-check" [disabled]="germanChecks()[item.swedish] === true" (click)="checkGermanItem(item)">{{ germanChecks()[item.swedish] === true ? 'Rätt' : germanChecks()[item.swedish] === false ? 'Rätta igen' : 'Rätta' }}</button></div>
                @if (germanChecks()[item.swedish] !== undefined) { <span class="mark-icon" [class.mark-wrong]="germanChecks()[item.swedish] === false">@if (germanChecks()[item.swedish]) {<svg class="status-icon" viewBox="0 0 24 24" aria-label="Rätt"><path d="m5 12 4.5 4.5L19 7"/></svg>} @else {<svg class="status-icon retry-icon" viewBox="0 0 24 24" aria-label="Fel"><path d="M20 7v5h-5M4.8 10a7.5 7.5 0 0 1 12.8-3L20 9M4 17v-5h5m10.2 2a7.5 7.5 0 0 1-12.8 3L4 15"/></svg>}</span> }
              </div>
              @if (germanChecks()[item.swedish] === false) { <p class="correct-answer">Rätt svar: <strong>{{ item.german }}</strong></p> }
            }
          </div>
          <div class="practice-actions"><span class="help-note">{{ germanReviewedCount() }} av {{ germanQuestions().length }} rättade · tips: Apple Pencil fungerar i svarsfälten</span>@if (allGermanReviewed() && germanWrongCount()) {<button class="secondary-button" (click)="retryGermanMistakes()">Öva på de {{ germanWrongCount() }} felaktiga</button>} @if (germanMistakeRound()) {<button class="secondary-button" (click)="openGerman()">Alla glosor</button>}</div>
        </section>
      }

      @if (subject() === 'physics') {
        <section class="study-page physics-page">
          <button class="back-button" (click)="goHome()"><svg class="arrow-icon back-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m7 7-7-7 7-7"/></svg> Alla veckans ämnen</button>
          <div class="study-heading"><div><p class="eyebrow">VECKA 43 · FYSIK</p><h1>Kraft och rörelse</h1><p class="intro">Välj hur du vill träna begreppen.</p></div><span class="heading-icon blue"><svg class="sparkle-icon subject-sparkle" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5 14.8 9l6.7 3-6.7 2.9L12 21.5l-2.8-6.6L2.5 12l6.7-3L12 2.5Z"/></svg></span></div>
          <div class="mode-tabs" role="tablist" aria-label="Välj övningsläge">
            <button [class.active]="physicsMode() === 'match'" (click)="setPhysicsMode('match')"><span>01</span> Para ihop</button>
            <button [class.active]="physicsMode() === 'write'" (click)="setPhysicsMode('write')"><span>02</span> Skriv begreppet</button>
          </div>
          @if (physicsMode() === 'match') {
            <p class="mode-description">Välj rätt förklaring till varje begrepp. Du kan ändra svaren innan du rättar.</p>
            <div class="match-list">
              @for (term of shuffledPhysics(); track term.term; let i = $index) {
                  <div class="match-row" [class.right-row]="matchChecks()[term.term] === true" [class.wrong-row]="matchChecks()[term.term] === false">
                  <span class="row-number">{{ i + 1 }}</span><img class="physics-illustration" [src]="'physics/' + term.image" alt=""><strong>{{ term.term }}</strong>
                  <div class="answer-entry match-entry"><select [(ngModel)]="matchAnswers()[term.term]" (ngModelChange)="physicsMatchChanged(term)" [disabled]="matchChecks()[term.term] === true" [attr.aria-label]="'Förklaring för ' + term.term">
                    <option value="">Välj en förklaring…</option>
                    @for (option of shuffledPhysics(); track option.term) { <option [value]="option.term">{{ option.definition }}</option> }
                  </select><button class="row-check" [disabled]="matchChecks()[term.term] === true" (click)="checkPhysicsMatch(term)">{{ matchChecks()[term.term] === true ? 'Rätt' : matchChecks()[term.term] === false ? 'Rätta igen' : 'Rätta' }}</button></div>
                  @if (matchChecks()[term.term] !== undefined) { <span class="mark-icon" [class.mark-wrong]="matchChecks()[term.term] === false">@if (matchChecks()[term.term]) {<svg class="status-icon" viewBox="0 0 24 24" aria-label="Rätt"><path d="m5 12 4.5 4.5L19 7"/></svg>} @else {<svg class="status-icon retry-icon" viewBox="0 0 24 24" aria-label="Fel"><path d="M20 7v5h-5M4.8 10a7.5 7.5 0 0 1 12.8-3L20 9M4 17v-5h5m10.2 2a7.5 7.5 0 0 1-12.8 3L4 15"/></svg>}</span> }
                  </div>
                @if (matchChecks()[term.term] === false) { <p class="correct-answer match-correction">Rätt förklaring: <strong>{{ term.definition }}</strong></p> }
              }
            </div>
            <div class="practice-actions"><span class="help-note">{{ physicsReviewedCount() }} av {{ shuffledPhysics().length }} rättade</span>@if (allPhysicsReviewed() && physicsWrongCount()) {<button class="secondary-button" (click)="retryPhysicsMistakes()">Öva på de {{ physicsWrongCount() }} felaktiga</button>} @if (physicsMistakeRound()) {<button class="secondary-button" (click)="resetPhysics()">Alla begrepp</button>}</div>
          } @else {
            <p class="mode-description">Läs förklaringen och skriv vilket fysikbegrepp som passar.</p>
            <div class="answer-sheet physics-write-sheet">
              @for (term of shuffledPhysics(); track term.term; let i = $index) {
                <div class="definition-row" [class.right-row]="writeChecks()[term.term] === true" [class.wrong-row]="writeChecks()[term.term] === false">
                  <span class="row-number">{{ i + 1 }}</span><img class="physics-illustration" [src]="'physics/' + term.image" alt=""><span class="definition-text">{{ term.definition }}</span>
                  <div class="answer-entry"><input type="text" [(ngModel)]="physicsAnswers()[term.term]" (ngModelChange)="physicsWriteChanged(term)" [disabled]="writeChecks()[term.term] === true" [attr.aria-label]="'Skriv begreppet för: ' + term.definition" placeholder="Skriv begreppet…" autocomplete="off" autocapitalize="none" spellcheck="false"><button class="row-check" [disabled]="writeChecks()[term.term] === true" (click)="checkPhysicsWrite(term)">{{ writeChecks()[term.term] === true ? 'Rätt' : writeChecks()[term.term] === false ? 'Rätta igen' : 'Rätta' }}</button></div>
                  @if (writeChecks()[term.term] !== undefined) { <span class="mark-icon" [class.mark-wrong]="writeChecks()[term.term] === false">@if (writeChecks()[term.term]) {<svg class="status-icon" viewBox="0 0 24 24" aria-label="Rätt"><path d="m5 12 4.5 4.5L19 7"/></svg>} @else {<svg class="status-icon retry-icon" viewBox="0 0 24 24" aria-label="Fel"><path d="M20 7v5h-5M4.8 10a7.5 7.5 0 0 1 12.8-3L20 9M4 17v-5h5m10.2 2a7.5 7.5 0 0 1-12.8 3L4 15"/></svg>}</span> }
                </div>
                @if (writeChecks()[term.term] === false) { <p class="correct-answer">Rätt begrepp: <strong>{{ term.term }}</strong></p> }
              }
            </div>
            <div class="practice-actions"><span class="help-note">{{ physicsReviewedCount() }} av {{ shuffledPhysics().length }} rättade</span>@if (allPhysicsReviewed() && physicsWrongCount()) {<button class="secondary-button" (click)="retryPhysicsMistakes()">Öva på de {{ physicsWrongCount() }} felaktiga</button>} @if (physicsMistakeRound()) {<button class="secondary-button" (click)="resetPhysics()">Alla begrepp</button>}</div>
          }
        </section>
      }
      <footer>GJORD MED <svg class="footer-heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 8.8c0 5-8.5 11-8.5 11s-8.5-6-8.5-11a4.3 4.3 0 0 1 8.5-1 4.3 4.3 0 0 1 8.5 1Z"/></svg> FÖR ELLIE</footer>
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
  readonly germanChecks = signal<Record<string, boolean>>({});
  readonly matchChecks = signal<Record<string, boolean>>({});
  readonly writeChecks = signal<Record<string, boolean>>({});
  readonly germanMistakeRound = signal(false);
  readonly physicsMistakeRound = signal(false);

  goHome(): void { this.subject.set('home'); }

  openGerman(): void {
    this.germanQuestions.set(this.shuffle(germanWords));
    this.germanAnswers.set({});
    this.germanChecks.set({});
    this.germanMistakeRound.set(false);
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
    this.matchChecks.set({});
    this.writeChecks.set({});
    this.physicsMistakeRound.set(false);
  }

  checkGermanItem(item: typeof germanWords[number]): void {
    this.germanChecks.set({ ...this.germanChecks(), [item.swedish]: this.isGermanCorrect(item) });
  }

  germanAnswerChanged(item: typeof germanWords[number]): void {
    const checks = { ...this.germanChecks() };
    delete checks[item.swedish];
    this.germanChecks.set(checks);
  }

  germanReviewedCount(): number { return Object.keys(this.germanChecks()).length; }
  germanWrongCount(): number { return this.germanQuestions().filter((item) => this.germanChecks()[item.swedish] === false).length; }
  allGermanReviewed(): boolean { return this.germanReviewedCount() === this.germanQuestions().length; }

  retryGermanMistakes(): void {
    const mistakes = this.germanQuestions().filter((item) => this.germanChecks()[item.swedish] === false);
    if (!mistakes.length) return;
    this.germanQuestions.set(this.shuffle(mistakes));
    this.germanAnswers.set({});
    this.germanChecks.set({});
    this.germanMistakeRound.set(true);
  }

  checkPhysicsMatch(term: PhysicsTerm): void {
    this.matchChecks.set({ ...this.matchChecks(), [term.term]: this.matchAnswers()[term.term] === term.term });
  }

  physicsMatchChanged(term: PhysicsTerm): void {
    const checks = { ...this.matchChecks() };
    delete checks[term.term];
    this.matchChecks.set(checks);
  }

  checkPhysicsWrite(term: PhysicsTerm): void {
    this.writeChecks.set({ ...this.writeChecks(), [term.term]: this.isPhysicsCorrect(term) });
  }

  physicsWriteChanged(term: PhysicsTerm): void {
    const checks = { ...this.writeChecks() };
    delete checks[term.term];
    this.writeChecks.set(checks);
  }

  physicsReviewedCount(): number {
    return Object.keys(this.physicsMode() === 'match' ? this.matchChecks() : this.writeChecks()).length;
  }

  physicsWrongCount(): number {
    const checks = this.physicsMode() === 'match' ? this.matchChecks() : this.writeChecks();
    return this.shuffledPhysics().filter((term) => checks[term.term] === false).length;
  }

  allPhysicsReviewed(): boolean { return this.physicsReviewedCount() === this.shuffledPhysics().length; }

  retryPhysicsMistakes(): void {
    const checks = this.physicsMode() === 'match' ? this.matchChecks() : this.writeChecks();
    const mistakes = this.shuffledPhysics().filter((term) => checks[term.term] === false);
    if (!mistakes.length) return;
    this.shuffledPhysics.set(this.shuffle(mistakes));
    this.matchAnswers.set({});
    this.physicsAnswers.set({});
    this.matchChecks.set({});
    this.writeChecks.set({});
    this.physicsMistakeRound.set(true);
  }

  isGermanCorrect(item: typeof germanWords[number]): boolean {
    return this.normalize(this.germanAnswers()[item.swedish] ?? '') === this.normalize(item.german);
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
