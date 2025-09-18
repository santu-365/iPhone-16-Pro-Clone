pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/santu-365/iPhone-16-Pro-Clone.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Verify Build Contents') {
    steps {
        sh '''
        echo "Checking build folder..."
        ls -lah build
        '''
    }
}


        stage('Verify Build') {
            steps {
                sh '''
                echo "Checking build folder..."
                ls -l build
                '''
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || true'
            }
        }

        stage('Serve') {
            steps {
                sh '''
                # Stop any old container
                docker rm -f iphone_clone || true

                # Run Nginx container serving build folder (read-only mount)
                docker run -d --name iphone_clone -p 80:80 \
               -v $WORKSPACE/dist:/usr/share/nginx/html:ro

                  nginx
                '''
            }
        }
    }
}
