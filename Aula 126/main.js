var song = "";
var left_wrist_score = 0;
var right_wrist_score = 0;
var left_wrist_x = 0;
var right_wrist_x = 0;
var left_wrist_y = 0;
var right_wrist_y = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(900, 700);
    canvas.position(440, 200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("O PoseNet foi iniciado.");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        left_wrist_score = results[0].pose.keypoints[9].score;
        right_wrist_score = results[0].pose.keypoints[10].score;
        console.log("left_wrist_score =" + left_wrist_score + "right_wrist_score =" + right_wrist_score);
        left_wrist_x = results[0].pose.leftWrist.x;
        right_wrist_x = results[0].pose.rightWrist.x;
        console.log("left_wrist_x =" + left_wrist_x + "right_wrist_x =" + right_wrist_x);
        left_wrist_y = results[0].pose.leftWrist.y;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("left_wrist_y =" + left_wrist_y + "right_wrist_y =" + right_wrist_y);
    }
}

function draw() {
    image(video, 0, 0, 900, 700);
    fill("#000000");
    stroke("#000000");
    if (right_wrist_score > 0.2) {
        circle(right_wrist_x, right_wrist_y, 20);
        if (right_wrist_y > 0 && right_wrist_y <= 260) {
            document.getElementById("velocidade").innerHTML = "velocidade = 0.5x";
            song.rate(0.5);
        }
        else if (right_wrist_y > 260 && right_wrist_y <= 300) {
            document.getElementById("velocidade").innerHTML = "velocidade = 1x";
            song.rate(1);
        }
        else if (right_wrist_y > 300 && right_wrist_y <= 480) {
            document.getElementById("velocidade").innerHTML = "velocidade = 1.5x";
            song.rate(1.5);
        }
        else if (right_wrist_y > 480 && right_wrist_y <= 540) {
            document.getElementById("velocidade").innerHTML = "velocidade = 2x";
            song.rate(2);
        }
        else if (right_wrist_y > 540) {
            document.getElementById("velocidade").innerHTML = "velocidade = 2.5x";
            song.rate(2.5);
        }
    }
    if (left_wrist_score > 0.2) {
        circle(left_wrist_x, left_wrist_y, 20);
        number = Number(left_wrist_y);
        remove_decimals = floor(number);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "volume =" + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}