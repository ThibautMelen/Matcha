<template>

    <!-- RESET -->
    <section id="sect">
        <form @submit.prevent="resetpass()">
            
            <h1>Reset your password</h1>
            
            <div class="input-group">      
                <input v-model="password" type="password" required>
                <span class="highlight"></span>
                <span c lass="bar"></span>
                <label>Password</label>
            </div>


            <div class="input-group">
                <input type="submit" value="reset pass">
            </div>

        </form>
    </section>

</template>

<script>

export default {
    data(){
        return {
            //INPUT INFOS
            password: ''
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

            console.log(this.$router.currentRoute.query)

            let data = {
                password: this.password,
                id: parseInt(this.$router.currentRoute.query.id),
                code: this.$router.currentRoute.query.code
            }

            // AXIOS BDD
            try {
                const res = await this.$api.post('/auth/reset_pass', data);

                console.log(res.data);
                console.log(res.status);

                //Gestion des erreurs 203
                if (res.data.success) {
                    this.$router.push('/login');
                }
                else {
                    alert(res.data.message);
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