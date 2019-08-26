pipeline {
    agent any

    stages {
        stage('checkout') {
            checkout scm
        }
        
        stage('prepare') {
            sh 'npm insta''
        }
        
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
