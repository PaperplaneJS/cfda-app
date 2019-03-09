pipeline {
    agent {
        // 此处设定构建环境，目前可选有
        // default, java-8, python-3.5, ruby-2.3, go-1.11 等
        // 详情请阅 https://dev.tencent.com/help/knowledge-base/how-to-use-ci#agents
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
                sh 'npm install'
                sh 'npm run build'
              
                echo "构建完成."
                
                sh 'tar zcvf dist.tar.gz dist'
                archiveArtifacts artifacts: 'dist.tar.gz', fingerprint: true // 收集构建产物
            }
        }
    }
}