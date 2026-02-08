#include<iostream>
#include<sstream>
#include<iomanip> //for fixed,setprecision
#include<string>
using namespace std;

int main(void){
    string s;
    cin>>s;
    for(int i=0;i<s.size();i++){
        double kazu=0.0;
        kazu=atof(&s[i]);
        //string kkazu=to_string(kazu);
        stringstream str;
        str<<fixed<<setprecision(15)<<kazu;
        cout<<str<<endl;
        
    }
}