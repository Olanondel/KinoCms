<template>
  <div class="dateWithText">
    <label class="general__text">{{text}}</label>
    <div class="form-group date-wrap">
      <div class="input-group date" id="reservationdate" data-target-input="nearest">
        <input
            type="text"
            class="form-control datetimepicker-input date-input"
            data-target="#reservationdate"
        >
        <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
          <div class="input-group-text"><i class="fa fa-calendar"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DateWithText",
  props: {
    text: {
      type: String,
      default: 'Дата Публикации'
    }
  },
  data() {
    return {
      obs: null
    }
  },
  methods: {
    changeDate() {

    },
  }
}
</script>

<style >
.date-input {
  max-width: 340px;
}

.date-wrap {
  width: 100%;
}

.dateWithText {
  display: flex;
}
</style>