#include <iostream>
#include<iomanip>
using namespace std;
int main(void){
    int n;
    double ans=1.0;
    cin>>n;
    for(int i=0;i<n;i++){
        ans=ans*(1+(1.0/n));
        
    }
    cout<<fixed<<setprecision(5)<<ans<<endl;
}