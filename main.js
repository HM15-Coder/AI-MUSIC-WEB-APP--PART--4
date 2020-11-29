song = "";
song_1 = "";
status="";
status_1 = "";

first_song = "Main Yahan Hoon";
second_song = "Chaand Taare";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreleftWrist = 0;
scorerightWrist = 0;

function preload()
{
    song= loadSound("main_yahan_hoon.mp3");
    song_1 = loadSound("Chaand_Taare.mp3");
}
function setup()
{
    canvas = createCanvas(400,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded()
{
    console.log('PoseNet is Initialized!');
}
status = song.isPlaying();

function draw()
{
    image(video,0,0,400,400);
    
    fill("#FFFF00");
    stroke("#FFFF00");
   

    if(scoreleftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song_1.stop();

        if(status_1 == false)
        {
            song.play();
    
            document.getElementById("song_name_button").innerHTML = "Song Name:" + first_song;
        }

    }

status_1 = song_1.isPlaying();

    if(scorerightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
        song.stop();

        if(status == false)
        {
            song_1.play();
    
            document.getElementById("song_name_button").innerHTML = "Song Name:" + second_song;
        }

    }


}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreleftWrist =  results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist =" +scorerightWrist + "scoreLeftWrist =" +scoreleftWrist);

        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX =" + leftWristX + "LeftWristY" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX =" + rightWristX + "RightWristY" + rightWristY);

    }
}
function play()
{
    song.play();

}
function stop()
{
    song.stop();

}
