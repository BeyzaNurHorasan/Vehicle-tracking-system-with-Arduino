var mosca = require('mosca')

var backend = {
  type: 'redis',
  redis: require('redis'),
  db: 12,
  port: 6379,
  return_buffers: true, // to handle binary payloads
  host: "localhost"
};

var moscaSettings = {
  port: 1883,
  backend,
  persistence: {
    factory: mosca.persistence.Redis
  },
  http:{
  port:3000,
}
};
var server = new mosca.Server(moscaSettings);
server.on('ready', setup);
server.on('clientConnected', function(client) {
	console.log('client connected', client.id);		
});
server.on('published', function(packet, client) {
  console.log('Published', packet.topic, packet.payload);
});
// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}