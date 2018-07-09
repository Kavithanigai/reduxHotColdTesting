import hotColdReducer from './index';
import {generateAuralUpdate,makeGuess,restartGame} from '../actions';

describe('hotColdReducer',() => {
  //Set up some seed data
   // guesses= ['5','7','11','10','6'],
  // feedback= 'Make your guess!',
  // auralStatus= '',
  // correctAnswer= '6'

it('Should set the initial state when nothing is passed in', () => {
        const state = hotColdReducer(undefined, {type: '__UNKNOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.auralStatus).toEqual('');
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
        expect(state.correctAnswer).toBeGreaterThanOrEqual(1);
    });

    it('Should return current state when nothing is passed in', () => {
        let newState={};
        const state = hotColdReducer(newState, {type: '__UNKNOWN'});
        expect(state).toBe(newState);
        });

    it('Should genearte aural update', () =>{
      let currentState ={
        guesses:[1,3,5,7,9],
        feedback: 'Nice Job!',
        correctAnswer: 9
      };
      const state = hotColdReducer(currentState, generateAuralUpdate());
      expect(state.auralStatus).toEqual(`Here's the status of the game right now: Nice Job! You've made 5 guesses. In order of most- to least-recent, they are: 9, 7, 5, 3, 1`);
    });


    it('Should restart a game', () => {
      let currentState ={
        guesses:[1,3,5,7,9],
        feedback: 'Nice Job!',
        correctAnswer: 9
      }
      let correctAnswer=9;
      const state = hotColdReducer(currentState, restartGame(correctAnswer));
      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual('Make your guess!');
      expect(state.auralStatus).toEqual('');
      expect(state.correctAnswer).toEqual(correctAnswer);
    });

    it('Should be able to make guess', () => {
      let currentState ={
        guesses:[],
        feedback: '',
        correctAnswer: 70
      }

    //1st Guess
    let state = hotColdReducer(currentState, makeGuess(40));
    expect(state.guesses).toEqual([40]);
    expect(state.feedback).toEqual("You're Cold...");
    //2nd Guess
     state = hotColdReducer(state, makeGuess(50));
    expect(state.guesses).toEqual([40, 50]);
    expect(state.feedback).toEqual("You're Warm.");
    //3rd Guess
     state = hotColdReducer(state, makeGuess(60));
    expect(state.guesses).toEqual([40, 50, 60]);
    expect(state.feedback).toEqual("You're Warm.");
    //4th Guess
     state = hotColdReducer(state, makeGuess(65));
    expect(state.guesses).toEqual([40, 50, 60, 65]);
    expect(state.feedback).toEqual("You're Hot!");
    //5th Guess
     state = hotColdReducer(state, makeGuess(70));
    expect(state.guesses).toEqual([40, 50, 60, 65, 70]);
    expect(state.feedback).toEqual("You got it!");


    });


  });
