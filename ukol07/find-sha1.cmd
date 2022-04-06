pushd hashcat
hashcat -a 3 -m 100 ../hashes-sha1.txt --potfile-disable --outfile ../found-sha1.txt -i --increment-min 4 -w 4 -1 ?l?u?d ?1?1?1?1?1?1?1?1
popd