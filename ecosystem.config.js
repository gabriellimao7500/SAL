module.exports = {
  apps : [{
    name: "SAL",
    script: "npm run start",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    env: {
      "HOST": "192.168.1.211",
      "PORT": 3333,
      "USER": "sal",
      "PASSWORD": "1234",
      "DATABASE": "sal",
      "PLATAFORM": "LINUX"
 },
  }]
}
