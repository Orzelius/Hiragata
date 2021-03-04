import { Guess, Progress } from '../../ElementContext';
import { KanaElement } from '../../Home/KanaTable/KanaTable';

class Evaluator {
  public selectedEl;

  public penalty; // amount to get punished for answering wrong

  public reward; // amount to get rewarded for answering correctly

  public urgencyHigherLimit; // element(s) with urgency above this will be choosen from 100%

  public memoryRefresher; // number of reviews after wich the letter should be reviewed once more

  public maxUrgency; // Urgency won't go above this

  constructor(evaluatorSettings: { selectedEl: KanaElement[], penalty: number, reward: number, urgencyHigherLimit: number, memoryRefresher: number, maxUrgency: number }) {
    const {
      maxUrgency, penalty, memoryRefresher, reward, selectedEl, urgencyHigherLimit,
    } = evaluatorSettings;
    this.selectedEl = selectedEl;
    this.reward = reward;
    this.penalty = penalty;
    this.urgencyHigherLimit = urgencyHigherLimit;
    this.memoryRefresher = memoryRefresher;
    this.maxUrgency = maxUrgency;
  }

  public chooseNextKana(currEl: KanaElement, progress: Progress): KanaElement {
    if (this.selectedEl.length === 1) return currEl;

    const urgentEl = progress.elements.filter(el => el.urgency >= this.urgencyHigherLimit);
    const linearHistory: { guess: Guess, el: KanaElement }[] = [];
    progress.elements.forEach(el => {
      const history = el.guesses.map(g => ({ guess: g, el: el.element }));
      linearHistory.push(...history);
    });
    linearHistory.sort((a, b) => b.guess.time - a.guess.time);

    // If something needs to be refreshed
    const memoryRefreshedElements = linearHistory.slice(0, this.memoryRefresher);
    const outDatedEl = progress.elements.find(el => el.guesses.length !== 0 && memoryRefreshedElements.every(historyEl => historyEl.el !== el.element));
    if (outDatedEl) {
      return outDatedEl.element;
    }

    // If there are urgent elements other than the current one
    if (urgentEl.length > 0 && !(urgentEl.length === 1 && urgentEl[0].element === currEl)) {
      const mostUrgent = urgentEl.sort((a, b) => b.urgency - a.urgency).find(el => el.element !== currEl);
      if (!mostUrgent) throw new Error('The programmer is stupid and made a fatal mistake, plese report bug');
      return mostUrgent.element;
    }

    // play lottery (random)
    const totalUrgency = progress.elements.map(el => el.urgency).reduce((total, cur) => total + cur);
    let nextEl = currEl;
    while (nextEl === currEl) {
      const selectUrgentValueAt = Math.round(Math.random() * (totalUrgency));
      let total = 0;
      for (let i = 0; i < progress.elements.length; i++) {
        const el = progress.elements[i];
        total += el.urgency;
        if (selectUrgentValueAt < total) {
          nextEl = el.element;
          break;
        }
      }
    }
    return nextEl;
  }

  public calculateUrgency(currEl: { el: KanaElement, correct: boolean }, progress: Progress): Progress {
    const currElProgress = progress.elements.find(el => el.element === currEl.el);
    if (!currElProgress) throw new Error("Something went verry wrong, couldn't find element " + currEl.el.latin);
    const streak: { n: number, positive: boolean } = { n: 0, positive: currEl.correct };

    currElProgress.guesses.every(g => {
      if (g.correct === streak.positive) {
        streak.n += 1;
        return true;
      }
      return false;
    });

    let urgency = currElProgress.urgency;
    if (streak.positive) {
      const totalReward = this.reward * streak.n;
      urgency = urgency <= totalReward ? 1 : urgency - totalReward;
    } else {
      const totalPenalty = this.penalty * streak.n;
      urgency += totalPenalty;
      if (urgency > this.maxUrgency) urgency = this.maxUrgency;
    }

    const newElHistory = [...progress.elements];
    newElHistory[newElHistory.findIndex(el => el.element === currEl.el)].urgency = urgency;

    return { ...progress, elements: newElHistory };
  }
}

export default Evaluator;