<template>
  <v-card color="transparent" height="500" flat>
      <v-form v-model="valid" ref="form" lazy-validation>
          <v-card-title primary-title>
              <span class="title">로그인</span>
              <v-spacer></v-spacer>
              <span class="caption">
                  또는&nbsp;
                <a @click="$emit('changeType')"> 회원가입 </a>
              </span>
          </v-card-title>
          <v-card-actions>
              <v-btn color="primary" block @click="signInWithGoogle">
                  <v-icon>mdi-google</v-icon>
                  <v-divider vertical class="mx-3"></v-divider>
                  Google 계정으로 로그인
              </v-btn>              
          </v-card-actions>
          <v-container grid-list-md fluid>
              <v-layout row wrap>
                  <v-flex xs5>
                      <v-divider class="mt-2"></v-divider>
                  </v-flex>
                  <v-flex xs2>
                      또는
                  </v-flex>
                  <v-flex xs5>
                      <v-divider class="mt-2"></v-divider>
                  </v-flex>
              </v-layout>              
          </v-container>
          <v-card-text>
              <v-text-field 
                label="이메일"
                v-model="form.email"
                :rules="[rule.required, rule.minLength(7), rule.maxLength(50), rule.email]"
                required
              ></v-text-field>
              <v-text-field 
                label="비밀번호"
                v-model="form.password"
                :rules="[rule.required, rule.minLength(6), rule.maxLength(50)]"
                type="password"
                required
              ></v-text-field>
          </v-card-text>
          <div class="recaptcha-terms-text">
              이 페이지는 reCAPTCHA로 보호되며, Google 개인정보처리방침 및 서비스 약관의 적용을 받습니다.
          </div>

          <v-card-actions>              
              <v-checkbox
                label="로그인 정보저장"
                v-model="agree"
                :rules="[rule.agree]"
                required
                ></v-checkbox>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!valid" @click="signInWithEmailAndPassword">로그인</v-btn>
          </v-card-actions>
          
      </v-form>
  </v-card>
</template>

<script>
export default {
    data () {
        return {
          form: {
            email: '',
            password: ''
          },
          agree: false,
          rule: {
            required: v => !!v || '필수 항목입니다.',
            minLength: length => v => v.length >= length || `${length} 자리 이상으로 입력하세요.`,
            maxLength: length => v => v.length <= length || `${length} 자리 이하로 입력하세요.`,
            email: v => /.+@.+/.test(v) || '이메일 형식에 맞지 않습니다.',
            agree: v => !!v || '약관에 동의해야 진행됩니다.',
          },
          valid: true
        }
    },
    methods: {
        async signInWithGoogle () {
            const provider = new this.$firebase.auth.GoogleAuthProvider();
            this.$firebase.auth().languageCode = 'ko';
            const r = await this.$firebase.auth().signInWithPopup(provider)
            console.log(r);
            const user = this.$firebase.auth().currentUser
            await user.getIdToken()
            await this.$store.dispatch('getUser', user)
            if (this.$store.state.claims === undefined) this.$router.push('/userProfile')
            this.$router.push('/')
        },
        async signInWithEmailAndPassword () {
            // if (this.$refs.form.validate()) return this.$toasted.global.error('입력 폼을 올바르게 작성해주세요.')
            // alert('ok')
            // console.log('ok')
            const r = await this.$firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
            console.log(r);
            const user = this.$firebase.auth().currentUser
            await user.getIdToken()
            await this.$store.dispatch('getUser', user)
            if (this.$store.state.claims === undefined) this.$router.push('/userProfile')
            this.$router.push('/')
        },
        // async signOut () {
        //     const r = await this.$firebase.auth().signOut()
        //     console.log(r);
        // },
    }

}
</script>

<style scoped>
.recaptcha-terms-text {
    font-size: 12px;
    font-weight: 200;
    color: #637282
}

</style>