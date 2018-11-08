<template>
  <v-container>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div class="text-md-center">
            <h2>sendnGD</h2>
            <h4 class="headline mt-2">
              <form id="app" @submit.prevent="onTransfer" method="post">
                <p>
                  <label for="address">Address</label>
                  <input id="address" v-model="address" type="text" name="address" pattern="^0x[a-fA-F0-9]{40}$" required>
                </p>
                <p>
                  <label for="amount">Amount</label>
                  <input id="amount" v-model="amount" type="amount" name="amount" min="1" pattern="^\d+(?:\.\d{1,2})?$" required>
                </p>
                <p>
                  <input type="submit" value="Submit">
                </p>
              </form>
            </h4>           
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        address: '',
        amount: '',
        transferEvent: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/profile')
        }
      }
    },
    methods: {
      onDismissed () {
        this.$store.dispatch('clearError')
      },
      onTransfer () {
        this.$store.state.contractInstance.transfer(this.address, this.amount, this.address, {
          gas: 300000,
          from: this.$store.state.web3.coinbase
        }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            let Transfer = this.$store.state.contractInstance.Transfer()
            Transfer.watch((err, result) => {
              if (err) {
                console.log('could not get event Transfer()')
              } else {
                console.log('Transfer Event Result' + result)
              }
            })
          }
        })
      }
    },
    mounted () {
      console.log('dispatching getContractInstance')
      this.$store.dispatch('getContractInstance')
    }
  }
</script>