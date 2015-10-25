var VistaDivsContainer = Backbone.View.extend({
  el: ('#container'),
  template: _.template($('#divsContainer').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});