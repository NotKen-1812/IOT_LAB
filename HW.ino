#include <ESP8266WiFi.h>
#include "FirebaseESP8266.h"
#include <ArduinoJson.h>
#define WIFI_SSID "Chau_Tran"//"ANH THU"
#define WIFI_PASSWORD "Minhchau123321"//"0123456789"

#define FIREBASE_HOST "iotkt-a9c2e-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "iRi30VlobOXxhKnx5J4Q4u9QGcgodZFGOT1l23v1"
#include <Servo.h>
#define GAS A0
#define LED D2
#define IR1 D0
#define IR2 D3
#define BUZZ D6
#define SOS D7
#define servo1Pin D5
Servo myservo; 

byte x,y,z = 0;
unsigned long t1 = 0;
int valuegas,value1,value2;

FirebaseData firebaseData;
//WiFiClient client;
String path = "/";
FirebaseJson json; 
void setup() {
  // put your setup code here, to run once:

  Serial.begin(9600);
  pinMode(IR1, INPUT);
  pinMode(IR2, INPUT);
  pinMode(LED, OUTPUT);
  pinMode(GAS, INPUT);
  pinMode(BUZZ, OUTPUT);
  pinMode(SOS, OUTPUT);

  myservo.attach(servo1Pin);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  if(Firebase.beginStream(firebaseData, path)){
    Serial.println("REASON: " + firebaseData.errorReason());
    Serial.print("");
  }

  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // put your main code here, to run repeatedly:
  valuegas = analogRead(GAS);
  value1 = digitalRead(IR1);
  value2 = digitalRead(IR2);

  Firebase.setInt(firebaseData,path + "/IR1",value1);
  Firebase.setInt(firebaseData,path + "/IR2",value2);
  Firebase.setInt(firebaseData,path + "/GAS",valuegas);

  if(millis()- t1 > 0.5)
  {
  if(Firebase.getInt(firebaseData, path + "/LED/state"))
  x = firebaseData.intData();
  if(Firebase.getInt(firebaseData, path + "/GATE/state"))
  y = firebaseData.intData();
  if(Firebase.getInt(firebaseData, path + "/SOS/state"))
  z = firebaseData.intData();

  
  if (x == 0)
    digitalWrite(LED, LOW);
  else
    digitalWrite(LED, HIGH);

  if (y == 1 || value1 == 0)
  {
    myservo.write(180);
    delay (5000);
  }
  if(y == 0 || value2 == 0)
  {
    Firebase.setInt(firebaseData,path + "/GATE/state",0);
    myservo.write(0);
  }

  if (z == 0)
    digitalWrite(SOS, LOW);
  else
    digitalWrite(SOS, HIGH);

  
  if (valuegas > 700|| z==1)
    digitalWrite(BUZZ, HIGH);
  else
    digitalWrite(BUZZ, LOW);

  t1 = millis();
  }

}




