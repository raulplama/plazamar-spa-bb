var VistaErrorAcceso = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#errorAcceso').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});