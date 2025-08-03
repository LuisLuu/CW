<template>
  <div>
    <h2>Vocabulary Test</h2>
    <div v-if="!finished">
      <div v-if="currentQuestion < questions.length">
        <div class="ui segment">
          <h3>Question {{ currentQuestion + 1 }} of 6</h3>
          <div v-if="questions[currentQuestion].type === 'match'">
            <p>Choose the word that matches <b>{{ questions[currentQuestion].prompt }}</b> in {{ questions[currentQuestion].targetLang }}:</p>
            <div class="ui buttons">
              <button
                v-for="(option, idx) in questions[currentQuestion].options"
                :key="idx"
                class="ui button"
                @click="answer(option)"
              >
                {{ option }}
              </button>
            </div>
          </div>
          <div v-else-if="questions[currentQuestion].type === 'rewrite'">
            <p>Rewrite the word <b>{{ questions[currentQuestion].prompt }}</b> in {{ questions[currentQuestion].targetLang }}:</p>
            <input v-model="userInput" class="ui input" />
            <button class="ui button" @click="answer(userInput)">Submit</button>
          </div>
          <div v-else-if="questions[currentQuestion].type === 'audio'">
            <p>Listen and choose the correct word:</p>
            <audio :src="questions[currentQuestion].audio" controls></audio>
            <div class="ui buttons">
              <button
                v-for="(option, idx) in questions[currentQuestion].options"
                :key="idx"
                class="ui button"
                @click="answer(option)"
              >
                {{ option }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>Your score: {{ score }}/6</h3>
      <div v-if="score <= 2" class="ui red message">Bad score. Keep practicing!</div>
      <div v-else-if="score <= 4" class="ui yellow message">Good score. Well done!</div>
      <div v-else class="ui green message">Outstanding! You're a vocab master!</div>
      <button class="ui button" @click="restart">Try Again</button>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'VocabTest',
  data() {
    return {
      words: [],
      questions: [],
      currentQuestion: 0,
      score: 0,
      finished: false,
      userInput: '',
    };
  },
  methods: {
    async fetchWords() {
      this.words = await api.getWords();
      this.generateQuestions();
    },
    shuffle(arr) {
      return arr.sort(() => Math.random() - 0.5);
    },
    generateQuestions() {
      const questions = [];
      const langs = ['english', 'vietnamese', 'spanish'];
      // 3 matching questions
      for (let i = 0; i < 3; i++) {
        const word = this.words[Math.floor(Math.random() * this.words.length)];
        const fromLang = langs[i % 3];
        const toLang = langs[(i + 1) % 3];
        const options = this.shuffle(this.words.map(w => w[toLang])).slice(0, 3);
        if (!options.includes(word[toLang])) options[0] = word[toLang];
        questions.push({
          type: 'match',
          prompt: word[fromLang],
          targetLang: toLang.charAt(0).toUpperCase() + toLang.slice(1),
          answer: word[toLang],
          options: this.shuffle(options),
        });
      }
      // 2 rewrite/unscramble questions
      for (let i = 0; i < 2; i++) {
        const word = this.words[Math.floor(Math.random() * this.words.length)];
        const fromLang = langs[i % 3];
        const toLang = langs[(i + 2) % 3];
        // Optionally scramble the answer
        let scrambled = word[toLang].split('').sort(() => Math.random() - 0.5).join('');
        questions.push({
          type: 'rewrite',
          prompt: word[fromLang],
          targetLang: toLang.charAt(0).toUpperCase() + toLang.slice(1),
          answer: word[toLang],
          scrambled,
        });
      }
      // 1 audio question (ensure correct answer is in options)
      const word = this.words[Math.floor(Math.random() * this.words.length)];
      let options = this.shuffle(this.words.map(w => w.english)).slice(0, 2); // pick 2 random
      if (!options.includes(word.english)) {
        options.push(word.english); // ensure correct answer is present
      }
      options = this.shuffle(options); // shuffle so answer isn't always last
      questions.push({
        type: 'audio',
        audio: `/audio/${word.english}.mp3`,
        answer: word.english,
        options,
      });

      this.questions = questions;
      this.currentQuestion = 0;
      this.score = 0;
      this.finished = false;
      this.userInput = '';
    },
    answer(ans) {
      const q = this.questions[this.currentQuestion];
      let correct = false;
      if (q.type === 'rewrite') {
        correct = ans.trim().toLowerCase() === q.answer.trim().toLowerCase();
      } else {
        correct = ans === q.answer;
      }
      if (correct) this.score++;
      this.userInput = '';
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
      } else {
        this.finished = true;
      }
    },
    restart() {
      this.generateQuestions();
    },
  },
  async mounted() {
    await this.fetchWords();
  },
};
</script>

<style scoped>
.ui.segment {
  margin-bottom: 20px;
}
.ui.message {
  margin-top: 20px;
}
</style>