// new Vue({
//    el: '#myapp',
//    data () {
//      return {
//        info: null,
//        bitcoin_info : null,
//        loading: true,
//        errored: false
//      }
//    },
//    mounted () {
//      axios
//        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
//        .then(response => (this.info = response))
//        .then(response => (this.bitcoin_info = response.data.bpi))
//        .catch(error => console.log(error))
//        .finally(() => this.loading = false)
//    },
//    filters: {
//       currencydecimal (value) {
//         return value.toFixed(2)
//       }
//     }
//  });

 new Vue({
   el: '#myformapp',
   data () {
     return {
       info: null,
       bitcoin_info : null,
       loading: true,
       errored: false
     }
   },
   
   filters: {
      currencydecimal (value) {
        return value.toFixed(2)
      }
    },
    methods: {
      submitEntry : function() {

         axios.post('http://localhost:3000/entry',{ params: { fname: this.fname, lname: this.lname, age: this.age }})
         .then(response => this.responseData = response.data)
         .catch(error => {});

         }
   }
 });