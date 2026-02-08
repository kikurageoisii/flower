#include <iostream>
#include <string>
using namespace std;

char reflector(char c){
    if(c<='m'){
        return 'm'-c+'n';
    }else{
        return 'n'-c+'m';
    }
}

int main(void){
    char a;
    cin>>a;
    cout<<reflector(a);

}