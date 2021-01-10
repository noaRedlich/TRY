<?php 
function checkRemoteFile($url)
{
    $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
            curl_setopt($ch, CURLOPT_NOBODY, 1);
                curl_setopt($ch, CURLOPT_FAILONERROR, 1);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                        if(curl_exec($ch)!==FALSE)
                            {
                                    return true;
                                        }
                                            else
                                                {
                                                        return false;
                                                            }
                                                            }
                                                            
//                                                            $url = 'https://credix.co.il/api/transactions/auth';
                                                            $url = 'https://ya.ru';
                                                            $check = checkRemoteFile($url);
                                                            
                                                            if(true == $check){
                                                        	echo "ok";
                                                        	}else{
                                                        	    echo "not ok";
                                                        	    }
                                                        	     
?>ssh 