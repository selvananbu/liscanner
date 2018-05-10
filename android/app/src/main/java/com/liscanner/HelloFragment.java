package com.liscanner;

/**
 * Created by selvaanb on 4/19/2018.
 */

public class HelloFragment extends ReactFragment {
    @Override
    public void onDestroy() {
        super.onDestroy();
    }
    @Override
    public String getMainComponentName() {
        return "liscanner"; // name of our React Native component we've registered
    }


    @Override
    public void onDetach() {
        super.onDetach();
        if(mReactInstanceManager!=null){
            ((MainApplication) getActivity().getApplication()).getReactNativeHost().clear();
        }
    }
}
