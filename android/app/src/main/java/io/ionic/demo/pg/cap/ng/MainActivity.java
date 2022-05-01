package io.ionic.demo.pg.cap.ng;

import com.getcapacitor.BridgeActivity;
import com.ionicframework.capacitor.Checkout;

public class MainActivity extends BridgeActivity {
@Override
  public void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);

  registerPlugin(Checkout.class);
}
}
