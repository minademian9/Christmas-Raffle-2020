 new Vue({
   el: '#registerform',
   data () {
         return {
           fullname: null,
           entries: 1,
           seller: null
           
         }
       },
    methods: {
      sendregistration : function() {
        if (this.fullname && this.entries && this.seller)
            {
            axios.post('/api/formdata',
            { fullname: this.fullname, entries: this.entries, seller: this.seller })
            .then(response => this.responseData = response.data)
            .catch(error => {});
            alert("Data Submitted")
            }
            
        }
   }
 });



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

