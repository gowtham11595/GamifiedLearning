
//Program to find the TooShortHash using Brute Force Attack
#include <iostream>
#include <iomanip>
#include <sstream>
#include <string>
#include <string.h>
#include <bits/stdc++.h>

using namespace std;
//Possible charecters from with which we will form the messages 
char chars[]={'a','f','2','3','4','b','6','d','8','9','0','5','c','7','e','1'};

#include <openssl/sha.h>

//Method to calculate SHA256
string sha256(const string str)
{
    unsigned char hash[SHA256_DIGEST_LENGTH];
    SHA256_CTX sha256;
    SHA256_Init(&sha256);
    SHA256_Update(&sha256, str.c_str(), str.size());
    SHA256_Final(hash, &sha256);
    stringstream ss;
    for(int i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        ss << hex << setw(2) << setfill('0') << (int)hash[i];
    }
    return ss.str();
}

//Method which generates random messages and does the collision attack on the first 4 digits of the SHA256 checksum
void TooShortHash(int width, int position, string baseString, char cmpStr[]) {  
    int result;
    char shaResult[200];
    string shacnvrt;
      for(int i=0;i<16;i++) {
          if (position < width-1) {  
            TooShortHash(width, position+1, baseString+chars[i],cmpStr);
          }
          shacnvrt = sha256(baseString+chars[i]); //Generates sha256 checksum
          strcpy(shaResult, shacnvrt.c_str()); 
          result = strncmp(shaResult, cmpStr, 4); //Check first 4 digits
          if(result ==0){
              //Output if you found a match and exit the program
              cout<<"The matched input is: "<<baseString+chars[i]<<endl<<"The output for TooShortHash: "<<shaResult<<endl;
              exit(0);
          }
      }
}

int main() {
    //SHA256 checksum for given input
    cout <<"The SHA256 checksum for given input is: " <<sha256("ab096701ab096701ab96701ab0967013ab096701ab096701ab96701ab0967013") << endl;
    string cmpStr = sha256("ab096701ab096701ab96701ab0967013ab096701ab096701ab96701ab0967013");
    char cmpChar[200];
    strcpy(cmpChar, cmpStr.c_str()); 
    for(int i = 64; i >0; i--){
        TooShortHash(i,0,"",cmpChar);
    }
    return 0;
}