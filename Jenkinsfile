node {
    stage('Checkout') {
            checkout scm
        }
        
        stage('Prepare') {
          steps {
            sh 'npm install'
            sh 'npm install -g gatsby-cli'
          }
        }
        
        stage('Build') {
            steps {
              sh 'npm run build'
            }
        }

        stage('Deploy') {
          steps {
          sh 'npm run serve'
          }
        }
}
