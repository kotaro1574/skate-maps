<template>
  <div class="signup">
    <div class="signup-card">
      <h1 class="signup-title">新規登録</h1>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit()">
          <ValidationProvider name="名前" rules="required" v-slot="{ errors }">
            <div class="form-group">
              <label>名前</label>
              <input type="text" class="form-control" v-model="name">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="メールアドレス" rules="required|email" v-slot="{ errors }">
            <div class="form-group">
              <label>メールアドレス</label>
              <input type="email" class="form-control" v-model="email">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          
          <ValidationProvider name="パスワード" rules="required|max:12|min:6" v-slot="{ errors }">
            <div class="form-group">
              <label>パスワード</label>
              <input type="password" class="form-control" v-model="password">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="地域" rules="required" v-slot="{ errors }">
            <div class="form-group">
              <label>地域</label>
              <select class="custom-select" v-model="area" @change="onChange()">
                <option value="" selected>都道府県</option>
                <option value="北海">北海道</option>
                <option value="青森">青森</option>
                <option value="岩手">岩手</option>
                <option value="宮城">宮城</option>
                <option value="秋田">秋田</option>
                <option value="山形">山形</option>
                <option value="福島">福島</option>
                <option value="茨城">茨城</option>
                <option value="栃木">栃木</option>
                <option value="群馬">群馬</option>
                <option value="埼玉">埼玉</option>
                <option value="千葉">千葉</option>
                <option value="東京">東京</option>
                <option value="神奈川">神奈川</option>
                <option value="新潟">新潟</option>
                <option value="富山">富山</option>
                <option value="石川">石川</option>
                <option value="福井">福井</option>
                <option value="山梨">山梨</option>
                <option value="長野">長野</option>
                <option value="岐阜">岐阜</option>
                <option value="静岡">静岡</option>
                <option value="愛知">愛知</option>
                <option value="三重">三重</option>
                <option value="滋賀">滋賀</option>
                <option value="京都">京都</option>
                <option value="大阪">大阪</option>
                <option value="兵庫">兵庫</option>
                <option value="奈良">奈良</option>
                <option value="和歌山">和歌山</option>
                <option value="鳥取">鳥取</option>
                <option value="島根">島根</option>
                <option value="岡山">岡山</option>
                <option value="広島">広島</option>
                <option value="山口">山口</option>
                <option value="徳島">徳島</option>
                <option value="香川">香川</option>
                <option value="愛媛">愛媛</option>
                <option value="高知">高知</option>
                <option value="福岡">福岡</option>
                <option value="佐賀">佐賀</option>
                <option value="長崎">長崎</option>
                <option value="熊本">熊本</option>
                <option value="大分">大分</option>
                <option value="宮崎">宮崎</option>
                <option value="鹿児島">鹿児島</option>
                <option value="沖縄">沖縄</option>
              </select>
              <p>{{area}}</p>
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <div class="text-center">
            <button type="submit" class="btn btn-primary mt-3" tect="Submit" @click="auth">新規登録</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      area: '',
      lat: '',
      lng: '',
      address: ''
    }
  },
  methods: {
    onChange() {
      this.geocoder.geocode({
        'area': this.area
      },(results, status) => {
        if(status === google.maps.GeocoderStatus.OK) {
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
        }
      })
    },
    auth() {
      axios
        .post("http://127.0.0.1:8000/api/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          userLat: this.lat,
          userLng: this.lng,
        })
        .then(response => {
          console.log(response);
          this.$router.replace("/");
        })
    },
  },
  mounted() {
    this.$gmapApiPromiseLazy().then(() => {
      this.geocoder = new google.maps.Geocoder()
    })
  }
}
</script>

<style scoped>
.signup {
  height: 1000px;
}
.signup-card {
  height: 900px;
  width: 70%;
  margin: 100px auto;
  padding: 15px 30px 30px;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;  
}
.signup-title {
  margin-bottom: 25px;
  text-align: center;
}
</style>
