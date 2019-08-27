node {
    try {
        stage('Checkout') {
           checkout scm
        }
        
        stage('Prepare') {
          sh 'npm install'
            sh 'npm install -g gatsby-cli'
        }
        
        stage('Build') {
           sh 'npm run build'
        }

        stage('Deploy') {
          sh 'npm run serve'
        }
    }
}
