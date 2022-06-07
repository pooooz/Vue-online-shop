const Error = {
  data() {
    return {
      text: ''
    }
  },
  computed: {
    isVisible() {
      return this.text !== ''
    }
  },
  template: `
    <div class="error__block" v-if="isVisible">
      <p class="error__msg">
        <button class="error__btn" @click="text=''">&times;</button>
        {{ text }}
      </p>
    </div>
    `
}

export {
  Error
};