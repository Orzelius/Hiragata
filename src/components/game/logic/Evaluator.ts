import { GElement, Guess, Progress } from '../../ElementContext';
import { KanaElement } from '../../Home/Select/KanaTable/KanaTable';

class Evaluator {
  public selectedEl;

  public penalty; // amount to get punished for answering wrong

  public reward; // amount to get rewarded for answering correctly

  public urgencyHigherLimit; // element(s) with urgency above this will be choosen from 100%

  public memoryRefresher; // number of reviews after wich the letter should be reviewed once more

  public maxUrgency; // Urgency won't go above this

  public maxStreak;

  constructor(evaluatorSettings: {
    selectedEl: KanaElement[],
    penalty: { green: number, red: number }, // green: penalty when below urgencyHigherLimit, red when over
    reward: number, urgencyHigherLimit: number,
    memoryRefresher: number,
    maxUrgency: number,
    maxStreak: { positive: number, negative: number }
  }) {
    const {
      maxUrgency, penalty, memoryRefresher, reward, selectedEl, urgencyHigherLimit, maxStreak,
    } = evaluatorSettings;
    this.selectedEl = selectedEl;
    this.reward = reward;
    this.penalty = penalty;
    this.urgencyHigherLimit = urgencyHigherLimit;
    this.memoryRefresher = memoryRefresher;
    this.maxUrgency = maxUrgency;
    this.maxStreak = maxStreak;
  }

  public chooseLearn(progress: Progress): { element: KanaElement, canBeLearnt: boolean, percent: number, mustBeLearnt: boolean } | 'nothing to learn' {
    const notLearntEl = progress.elements.filter(el => el.status === 'notLearnt');
    const learntEl = progress.elements.filter(el => el.status !== 'notLearnt');

    if (notLearntEl.length === 0) return 'nothing to learn';

    // Must a new element be learnt?
    if (learntEl.length < 2 && notLearntEl.length >= 1) {
      return ({
        element: notLearntEl[0].element, canBeLearnt: true, percent: 100, mustBeLearnt: true,
      });
    }

    // Should a new element be learn?
    const urgentEl = learntEl.filter(el => el.status === 'urgent' || el.status === 'fresh');
    if (urgentEl.length === 0) {
      return {
        canBeLearnt: true, element: notLearntEl[0].element, mustBeLearnt: false, percent: 100,
      };
    }
    const totalUrgOverLimit = urgentEl.map(el => el.urgency - this.urgencyHigherLimit + 1).reduce((a, b) => a + b);

    const percentage = 100 - (totalUrgOverLimit / (urgentEl.length * (this.maxUrgency - this.urgencyHigherLimit))) * 100;
    return {
      canBeLearnt: percentage === 100, element: notLearntEl[0].element, mustBeLearnt: false, percent: percentage,
    };
  }

  public chooseNextKana(currEl: KanaElement, progress: Progress): KanaElement {
    // If only one el is selected
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

    currElProgress.guesses.every(g => g.correct === streak.positive && streak.n++);

    let urgency = currElProgress.urgency;
    if (streak.positive) {
      let totalReward = this.reward * streak.n;
      if (totalReward > this.maxStreak.positive) totalReward = this.maxStreak.positive;
      urgency = urgency <= totalReward ? 1 : urgency - totalReward;
    } else {
      let totalPenalty = currElProgress.status === 'green' ? this.penalty.green : this.penalty.red * streak.n;
      if (totalPenalty > this.maxStreak.negative) totalPenalty = this.maxStreak.positive;
      urgency += totalPenalty;
      if (urgency > this.maxUrgency) urgency = this.maxUrgency;
    }

    const newElHistory = [...progress.elements];
    const newElI = newElHistory.findIndex(el => el.element === currEl.el);
    newElHistory[newElI].urgency = urgency;
    newElHistory[newElI].status = urgency >= this.urgencyHigherLimit ? 'urgent' : 'green';

    return { ...progress, elements: newElHistory };
  }

  public changeUrgency(current: GElement, change: number): GElement {
    const newEl = { ...current };
    newEl.urgency += change;
    if (newEl.urgency > this.maxUrgency) newEl.urgency = this.maxUrgency;
    else if (newEl.urgency < 1) newEl.urgency = 1;
    newEl.status = newEl.urgency >= this.urgencyHigherLimit ? 'urgent' : 'green';
    return newEl;
  }
}

export default Evaluator;