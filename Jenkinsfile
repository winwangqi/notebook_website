pipeline {
    agent {
        docker {
            image 'node'
            args '-p 3000:3000'
        }
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("Prepare") {
            steps {
                dir("${WORKSPACE}/.cache") {
                    deleteDir()
                }

                dir("${WORKSPACE}/public") {
                    deleteDir()
                }

                sh "rm -rf /home/wwwroot/notebook/*"

                sh "npm install"
              
                sh "npm rebuild node-sass"
            }
        }

        stage("Build") {
            steps {
                sh "npm run build"
            }
        }

        stage("Archive") {
            // sh "tar -cvf ./archive/release:${BUILD_ID}.tar ./notebook/public"
            steps {
                sh "mv  *  /home/wwwroot/notebook"
            }
        }
    }
}
