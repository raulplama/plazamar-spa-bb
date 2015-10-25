var VistaLegal1 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#legal_1').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaLegal2 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#legal_2').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaLegal3 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#legal_3').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});