node {
    env.NODEJS_HOME = "${tool 'NodeJS 12.9.1'}"
    // on linux / mac
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    
    stage('Checkout') {
       checkout scm
    }
    
    stage('Prepare') {
      sh 'npm install'
      sh 'npm install -g gatsby-cli'
      sh 'gatsby telemetry --disable'
    }

    stage('Build') {
      sh 'npm run build'
    }

    stage('Deploy') {
      sh 'npm run serve'
    }
}
