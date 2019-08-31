<template>

    <!-- RESET -->
    <section id="sect">
        <form @submit.prevent="resetpass()">
            
            <h1>Write your mail for reset</h1>

            <div class="input-group">      
                <input v-model="email" type="mail" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Mail Adress</label>
            </div>

            <div class="input-group">
                <input type="submit" value="Send Mail">
            </div>

        </form>
    </section>

</template>

<script>

export default {
    data(){
        return {
            //INPUT INFOS
            email:''
        }
    },
    created() {
        if (this.$store.state.user) {
            this.$router.push('/')
        }
    },
    components: {
    },
    methods:{
        //REGISTER FORM
        async resetpass () {
            // AXIOS BDD
            try {
                const res = await this.$api.get(`/auth/lost_pass/${this.email}`);

                console.log(res.data);
                console.log(res.status);

                //Gestion des erreurs 203
                if(res.data.success) {
                    this.$router.push('/login');
                    alert('A reset link was sent to you by email, use it to reset your password')
                }
                else {
                    alert(res.data.message || 'SERVER ERROR');
                }
            } catch (ex) {
                console.log(ex);
            }
        }
    },
    computed: {
    },
    mounted() {
    }
}
</script>

<style type="text/css" scoped>
  @import '../../css/reg_log.css';
</style>