#include <iostream>
#include <string>
using namespace std;
  
void spin_rotor(string& rotor){ 
    char b = rotor[0];
    for(int i=0;i<25;i++){
        char a=rotor[i+1];
        rotor[i]=a;
    }
    rotor[25]=b;
}

char reflector(char c){
    if(c<='m'){
        return 'm'-c+'n';
    }else{
        return 'n'-c+'m';
    }
}

char rotor_first(const string& rotor,char c){ 
    return rotor[c-'a'];
}

char rotor_second(const string& rotor,char c){
    for(int i=0;i<26;i++){
        if(rotor[i]==c){
            return 'a'+i;
        }
    }
    return c; 
}


int main(void){
   
    string rotor;
    string str_plain;
    cin>>rotor>>str_plain;

    for(int i=0;i<str_plain.size();i++){
        char c=str_plain[i];
        c=rotor_first(rotor,c);
        c=reflector(c);
        c=rotor_second(rotor,c);
        cout<<c;
        spin_rotor(rotor);
    }
    
    cout<<endl;
   
}