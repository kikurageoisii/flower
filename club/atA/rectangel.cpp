#include <iostream>
#include <vector>
using namespace std;

int main(void){
    int h=0,w=0;
    cin>>h>>w;
    int tan[h][w];
    
    for(int i=0;i<h;i++){
        for(int e=0;e<w;e++){
            cin>>tan[i][e];
            
        }
    }

    int q=0;
    cin>>q;
    int a[q],b[q],c[q],d[q];
    for(int z=0;z<q;z++){
        cin>>a[z]>>b[z]>>c[z]>>d[z];
    }
    
    for(int k=0;k<q;k++){ 
        int ans=0;  
         for(int s=b[k]-1;s<d[k];s++){
           for(int t=a[k]-1;t<c[k];t++){
                ans+=tan[t][s];
            }
        }
        cout<<ans<<endl;
    }
}
    