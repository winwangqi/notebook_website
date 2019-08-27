node {
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
