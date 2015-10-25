var VistaQuienesSomos = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#quienesSomos').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});