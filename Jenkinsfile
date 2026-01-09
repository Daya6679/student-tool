pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        CI = 'true'
        APP_PORT = '3000'
    }

    stages {

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                  npm install
                  npx playwright install --with-deps
                '''
            }
        }

        stage('Start App for Tests') {
            steps {
                sh '''
                  echo "Starting app in background..."
                  nohup npm start > app.log 2>&1 &
                  sleep 10
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                  echo "Running Playwright tests..."
                  npx playwright test
                '''
            }
        }

        stage('Stop Test App') {
            steps {
                sh '''
                  echo "Stopping test app..."
                  pkill -f "node" || true
                '''
            }
        }

        stage('Deploy with PM2') {
            when {
                expression { currentBuild.currentResult == 'SUCCESS' }
            }
            steps {
                sh '''
                  echo "Deploying with PM2..."
                  pm2 delete student-tool || true
                  pm2 start npm --name student-tool -- start
                  pm2 save
                '''
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD pipeline SUCCESS'
        }
        failure {
            echo '❌ CI/CD pipeline FAILED'
        }
        always {
            echo 'Pipeline finished'
        }
    }
}
