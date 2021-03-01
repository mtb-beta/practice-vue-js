Vue.component('comp-child', {
  template: '<li>{{ name }} HP.{{ hp }}<button v-on:click="doAttack">攻撃する</button><button v-on:click="doPowerup">パワーアップ</button></li>',
  props: {
    id: Number,
    name: String,
    hp: Number
  },
  methods: {
    // ボタンのクリックイベントのハンドラから$emitでattackを発火する
    doAttack: function () {
      // 引数として自分のIDを渡す
      this.$emit('attack', this.id)
    },
    doPowerup: function () {
      // 引数として自分のIDを渡す
      this.$emit('powerup', this.id)
    }
  }
})

new Vue({
  el: '#app',
  template: '<ul><comp-child v-for="item in list" v-bind:key="item.id" v-bind="item" v-on:attack="handleAttack" v-on:powerup="handlePowerup"></comp-child></ul>',
  data: {
    list: [
      { id: 1, name: 'スライム', hp: 100 },
      { id: 2, name: 'ゴブリン', hp: 200 },
      { id: 3, name: 'ドラゴン', hp: 500 }
    ]
  },
  methods: {
    handleAttack: function (id) {
      // 引数のIDから要素を検索
      var item = this.list.find(function (el) {
        return el.id === id
      })
      // HPが0より多ければ10減らす
      if (item !== undefined && item.hp > 0) item.hp -= 10
    },
    handlePowerup: function (id) {
      var item = this.list.find(function (el) {
        return el.id === id
      })
      // HPが0より多ければ50増やす
      if (item !== undefined && item.hp > 0) item.hp += 50
    }
  }
})
