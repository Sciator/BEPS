pushd hashcat
hashcat -a 3 -m 0 ../hashes.txt --potfile-disable --outfile ../found.txt -i --increment-min 4 -w 4 -1 ?l?u?d ?1?1?1?1?1?1?1?1
popd