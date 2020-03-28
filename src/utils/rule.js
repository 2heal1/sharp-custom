const phoneRule = {
  validator: function(val) {
    return /^1\d{10}/.test(val);
  }
};
const passwordRule = {
  validator: function(val) {
    return /^([(a-z)|(A-Z)|(0-9)|(?_)]){5,10}$/.test(val);
  }
};
export default {
  phoneRule,
  passwordRule
};
