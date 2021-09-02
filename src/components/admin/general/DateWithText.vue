<template>
  <div class="dateWithText">
    <label class="general__text">{{text}}</label>
    <div class="form-group date-wrap">
      <div class="input-group date" id="reservationdate" data-target-input="nearest">
        <input
            type="text"
            class="form-control datetimepicker-input date-input"
            data-target="#reservationdate"
            id="datepicker-input"
            :value="value"
            @input="$emit('input', $event.target.value)"
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
      default: 'Дата Публикации',
    },
    value: String
  },
  data() {
    return {
      obs: null
    }
  },
  methods: {
    changeDate(e) {
      console.log(e.target.value)
      this.$emit('changeDate', e.target.value)
    },
    dateInit() {
      /* eslint-env jquery */
      $(function() {
        $('#reservationdate').datetimepicker({
          format: 'DD-MM-YYYY',
        })
      })

      $(function() {
        $('#reservationdate').on('change.datetimepicker', function () {
          $('#datepicker-input')[0].dispatchEvent(new Event('input'))
        })
      })
    }
  },
  mounted() {
    this.dateInit()
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
  align-items: center;
}

.form-group {
  margin-bottom: 0 !important;
}
</style>