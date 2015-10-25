var VistaAyuda1 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#ayuda_1').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaAyuda2 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#ayuda_2').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaAyuda3 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#ayuda_3').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});