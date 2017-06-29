

//Programa : Medidor de energia elétrica com Arduino e SCT-013
//Autor : ECA4b


//Carrega as bibliotecas
#include <EmonLib.h>
#include <SPI.h>
#include <Ethernet.h>
#include <string.h>
#include <LiquidCrystal.h>


//-------------------------------------------------------------------------------
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED }; //Setting MAC Address
char server[] = "api.pushingbox.com"; //pushingbox API server
IPAddress ip(192,168,0,5); //Arduino IP address. Only used when DHCP is turned off.
EthernetClient client; //define 'client' as object

String data; 
EnergyMonitor emon1; 
LiquidCrystal lcd(9, 8, 7, 6, 5, 4);

//Tensao da rede eletrica
int rede = 110.0;
 
//Pino do sensor SCT
int pino_sct = 1;

boolean bol = false;

//------------------------------------------------------------------------------
void setup() 
{
  lcd.begin(16, 2);
  lcd.clear();
  Serial.begin(9600);
  if (Ethernet.begin(mac) == 0) 
  {
  Serial.println("Failed to configure Ethernet using DHCP");
  Ethernet.begin(mac, ip);
  } 
  //Pino, calibracao - Cur Const= Ratio/BurdenR. 1800/62 = 29. 
  emon1.current(pino_sct, 29);
  //Informacoes iniciais display
  lcd.setCursor(0,0);
  lcd.print("Corr.(A):");
  lcd.setCursor(0,1);
  lcd.print("Pot.(w):");
  delay(2000);
}
//------------------------------------------------------------------------------
void loop()
{     
	//Calcula a corrente  
	double Corrente = emon1.calcIrms(1480);
	double Potencia = Corrente*rede;  //Calculo da Potência
	double Valor = 10; 				 //Calculo do Valor
	//Mostra o valor da corrente
	Serial.print("Corrente : ");
	Serial.print(Corrente); // Corrente
	lcd.setCursor(10,0);
	lcd.print(Corrente);
	  
	sensorData(); //packing GET query with data
       
    Serial.println("connecting...");
    if (client.connect(server, 80)) 
	{
    //Calcula e mostra o valor da potencia
    Serial.print(" Potencia : ");
    Serial.println(Potencia);
    lcd.setCursor(10,1);
    lcd.print("      ");
    lcd.setCursor(10,1);
    lcd.print(Potencia,1);
    }
       
    else
	{
      Serial.println("connection failed");
    }
    delay(2000); // interval 
  
}

void sensorData()
{
	data+="";
	data+="GET /pushingbox?devid=v8EB4DE71B591FF8&potencia="; //GET request query to pushingbox API
	data+=potencia;
	data+="&?devid=v8EB4DE71B591FF8&corrente=";
	data+=corrente;
	data+="&?devid=v8EB4DE71B591FF8&valor=";
	data+=valor;
	data+=" HTTP/1.1";
}

void sendData()
{
  Serial.println("connected");
  client.println(data);
  client.println("Host: api.pushingbox.com");
  client.println("Connection: close");
  client.println();
}


