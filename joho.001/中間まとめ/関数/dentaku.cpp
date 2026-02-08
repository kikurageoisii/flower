#include<iostream>
#include<cmath>
#include<string>
#include<vector>
#include <cstdlib> //for atof
#include<iomanip>
#include<sstream>
using namespace std;


//いらない記号などを削除
void kesu(string &s){
    int i=0;
    while(i<s.size()){ //c++では \0
        if(s[i]!='+'&&s[i]!='/'&&s[i]!='*'&&s[i]!='-'&&s[i]!=')'&&s[i]!='.'&&s[i]!='('&&(s[i]<'0'||'9'<s[i])){
            s.erase(s.begin()+i);
        }else{
            i++;
        }
    }
}

//まず、足し算
double sisoku(const string  s){
    double ans=0.0;
    double kazu=0.0;
    int start=0;
    for(int i=0;i<s.size();i++){
        switch(s[i]){
            case '+':
                ans+=kazu;
                kazu=0.0;
                break;
            default:
                kazu = atof(s.substr(start, i - start).c_str());
                ans += kazu;
                start = i + 1;
            break;
        }
    }
    return ans;
}

int main(void){
    string s;
    cin>>s;
    kesu(s);
    cout<<fixed<<setprecision(2)<<sisoku(s)<<endl;
}

/*int digit(double x){
    if(x==0){
        return 1;
    }else{
        x=abs(x); //絶対値
        x=log10(x);
    }
}
*/

/*double keisan(string s){
    double ans=0.0;
    
    for(int i=0;s[i]!='\n';i++){
    switch(s[i]){
        case '+':
        ans+=keisan(&s[i+1]);
        break;

        case '-':
        ans-=keisan(&s[i+1]);
        break;
        case '*':
        ans*=keisan(&s[i+1]);
        break;
        case '/':
        ans/=keisan(&s[i+1]);
        break; 
        case '(':
        ans*= keisan(&s[i+1]);
        break;
        case ')':
        ans*=s[i+1];
        
       
        default:ans+=atoi(&s[i]);
       
    }
    } 
    return ans;
}
*/

/*
double keisan(string s){
    double ans=0.0;
    double su=0.0;
    for(int i=0;s[i]!='\n';i++){
        switch (s[i]){
            case ' ':

            case '+':
            ans+=su;
            break;
            
            default:
            su=atof(&s[i]);
           // size(su);
        }

        
        
    }
    return ans;
}
*/


/*
double suuji(string s){
    if('0'<=s[0]<='9'){
        return atof(&s[0]);
    }

    return 0.0; //変えた方がいいかも
}
*/

    
