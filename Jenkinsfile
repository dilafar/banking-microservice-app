#!usr/bin/env groovy
def COLOR_MAP = [
        'SUCCESS': 'good',
        'failure': 'danger'
]
library identifier: "jenkins-shared-library@master" , retriever: modernSCM([
        $class: "GitSCMSource",
        remote: "https://github.com/dilafar/jenkins-shared-library.git",
        credentialsId: "git-credentials",
])
def gv
pipeline{
    agent any
    environment{
        NEW_VERSION = "1.3.0"
        registryCredentials:
        registry
        appregistry:
    }
    tools{
        maven 'maven'
    }
    parameters{
        choice(name: 'VERSION',choices:["1.1.0","1.1.1","1.1.2"],description:'select version')
        booleanParam(name:'executeTests',defaultValue:true,description: '')
    }

    stages{
        stage("fetch code"){
            steps{
                git branch: 'main' , url: 'https://github.com/dilafar/banking-microservice-app.git'
            }
        }
        stage("increment version"){
            steps{
                script{
                    incrementPatchVersion()
                    def version = readFile('pom.xml')=~ '<version>(.+)</version>'
                    def build_version = version[0][1]
                    env.IMAGE_NAME = "${build_version}-${BUILD_NUMBER}"
                }
            }
        }
        stage("maven build"){
            steps{
                script{
                    buildApp()
                }
            }
        }

        stage("test"){
            when{
                expression{
                    params.executeTests
                }
            }
            steps{
                script{
                    testApp()
                }
            }
        }
        stage("checkstyle analysis"){
            when{
                expression{
                    params.executeTests
                }
            }
            steps{
                script{
                    checkStyleAnalysis()
                }
            }
        }

        stage("Sonar analysis"){
            environment{
                sonnerHome = tool 'sonar4.7'
            }
            steps{
                script{
                    sonarAnalysis(sonnerHome)
                }
            }
        }
        stage("Quality Gate"){
            steps{
                script{
                    qualityGate()
                }
            }
        }

        stage("upload Artifact"){
            steps{
                script{
                    nexusArtifactUpload(version)
                }
            }
        }

        stage("build and push image"){
            steps{
                script{
                    buildImage(:${IMAGE_NAME}")
                    dockerLogin()
                    dockerPush("fadhiljr/mssample:${IMAGE_NAME}")
                }
            }
        }

        stage("deploy"){
            steps{
                script{

                    deployApp()

                }
            }
        }

        stage("commit version update"){
            steps{
                script{
                    withCredentials([
                            usernamePassword(credentialsId: 'git-credentials', usernameVariable:'USER',passwordVariable:'PASS')
                    ]){
                        sh"git config --global user.name 'jenkins'"
                        sh"git config --global user.email 'jenkins@example.com'"
                        sh"git remote set-url origin https://${USER}:${PASS}@github.com/dilafar/springboot-demo-backend.git"
                        sh"git add ."
                        sh"git status"
                        sh"git branch"
                        sh"git config --list"
                        sh"git commit -m 'fix commit version bump and update the version'"
                        sh"git push origin HEAD:version-change"
                    }
                }
            }
        }

    }

    post{
        always{
            echo "slack notification"
            slackSend channel: '#jenkinscicd',
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}"
        }
    }

}