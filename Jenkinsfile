pipeline {
    agent {
        label "node-10"
    }
    stages  {
        
        stage("检出") {
            steps {
                sh 'ci-init'
                checkout(
                  [$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]], 
                  userRemoteConfigs: [[url: env.GIT_REPO_URL]]]
                )
            }
        }

        stage("构建") {
            steps {
                echo "构建中..."
                sh 'rm -rf dist'
                sh 'rm -f dist.zip'
              
                sh 'node -v'
                sh 'npm install --no-optional'
                sh 'npm run build'
              
                echo "构建完成."
                
                sh 'tar zcvf dist.tar.gz dist'
                archiveArtifacts artifacts: 'dist.tar.gz', fingerprint: true
            }
        }
    }
}