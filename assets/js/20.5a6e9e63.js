(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{500:function(e,n,s){"use strict";s.r(n);var a=s(4),i=Object(a.a)({},(function(){var e=this,n=e.$createElement,s=e._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h4",{attrs:{id:"基本"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基本"}},[e._v("#")]),e._v(" 基本")]),e._v(" "),s("p",[e._v("来源：https://www-numi.fnal.gov/offline_software/srt_public_context/WebDocs/Errors/unix_system_errors.html")]),e._v(" "),s("div",{staticClass:"language-c++ line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("#define EPERM            1      /* Operation not permitted */\n#define ENOENT           2      /* No such file or directory */\n#define ESRCH            3      /* No such process */\n#define EINTR            4      /* Interrupted system call */\n#define EIO              5      /* I/O error */\n#define ENXIO            6      /* No such device or address */\n#define E2BIG            7      /* Arg list too long */\n#define ENOEXEC          8      /* Exec format error */\n#define EBADF            9      /* Bad file number */\n#define ECHILD          10      /* No child processes */\n#define EAGAIN          11      /* Try again */\n#define ENOMEM          12      /* Out of memory */\n#define EACCES          13      /* Permission denied */\n#define EFAULT          14      /* Bad address */\n#define ENOTBLK         15      /* Block device required */\n#define EBUSY           16      /* Device or resource busy */\n#define EEXIST          17      /* File exists */\n#define EXDEV           18      /* Cross-device link */\n#define ENODEV          19      /* No such device */\n#define ENOTDIR         20      /* Not a directory */\n#define EISDIR          21      /* Is a directory */\n#define EINVAL          22      /* Invalid argument */\n#define ENFILE          23      /* File table overflow */\n#define EMFILE          24      /* Too many open files */\n#define ENOTTY          25      /* Not a typewriter */\n#define ETXTBSY         26      /* Text file busy */\n#define EFBIG           27      /* File too large */\n#define ENOSPC          28      /* No space left on device */\n#define ESPIPE          29      /* Illegal seek */\n#define EROFS           30      /* Read-only file system */\n#define EMLINK          31      /* Too many links */\n#define EPIPE           32      /* Broken pipe */\n#define EDOM            33      /* Math argument out of domain of func */\n#define ERANGE          34      /* Math result not representable */\n#define EDEADLK         35      /* Resource deadlock would occur */\n#define ENAMETOOLONG    36      /* File name too long */\n#define ENOLCK          37      /* No record locks available */\n#define ENOSYS          38      /* Function not implemented */\n#define ENOTEMPTY       39      /* Directory not empty */\n#define ELOOP           40      /* Too many symbolic links encountered */\n#define EWOULDBLOCK     EAGAIN  /* Operation would block */\n#define ENOMSG          42      /* No message of desired type */\n#define EIDRM           43      /* Identifier removed */\n#define ECHRNG          44      /* Channel number out of range */\n#define EL2NSYNC        45      /* Level 2 not synchronized */\n#define EL3HLT          46      /* Level 3 halted */\n#define EL3RST          47      /* Level 3 reset */\n#define ELNRNG          48      /* Link number out of range */\n#define EUNATCH         49      /* Protocol driver not attached */\n#define ENOCSI          50      /* No CSI structure available */\n#define EL2HLT          51      /* Level 2 halted */\n#define EBADE           52      /* Invalid exchange */\n#define EBADR           53      /* Invalid request descriptor */\n#define EXFULL          54      /* Exchange full */\n#define ENOANO          55      /* No anode */\n#define EBADRQC         56      /* Invalid request code */\n#define EBADSLT         57      /* Invalid slot */\n \n#define EDEADLOCK       EDEADLK\n \n#define EBFONT          59      /* Bad font file format */\n#define ENOSTR          60      /* Device not a stream */\n#define ENODATA         61      /* No data available */\n#define ETIME           62      /* Timer expired */\n#define ENOSR           63      /* Out of streams resources */\n#define ENONET          64      /* Machine is not on the network */\n#define ENOPKG          65      /* Package not installed */\n#define EREMOTE         66      /* Object is remote */\n#define ENOLINK         67      /* Link has been severed */\n#define EADV            68      /* Advertise error */\n#define ESRMNT          69      /* Srmount error */\n#define ECOMM           70      /* Communication error on send */\n#define EPROTO          71      /* Protocol error */\n#define EMULTIHOP       72      /* Multihop attempted */\n#define EDOTDOT         73      /* RFS specific error */\n#define EBADMSG         74      /* Not a data message */\n#define EOVERFLOW       75      /* Value too large for defined data type */\n#define ENOTUNIQ        76      /* Name not unique on network */\n#define EBADFD          77      /* File descriptor in bad state */\n#define EREMCHG         78      /* Remote address changed */\n#define ELIBACC         79      /* Can not access a needed shared library */\n#define ELIBBAD         80      /* Accessing a corrupted shared library */\n#define ELIBSCN         81      /* .lib section in a.out corrupted */\n#define ELIBMAX         82      /* Attempting to link in too many shared libraries */\n#define ELIBEXEC        83      /* Cannot exec a shared library directly */\n#define EILSEQ          84      /* Illegal byte sequence */\n#define ERESTART        85      /* Interrupted system call should be restarted */\n#define ESTRPIPE        86      /* Streams pipe error */\n#define EUSERS          87      /* Too many users */\n#define ENOTSOCK        88      /* Socket operation on non-socket */\n#define EDESTADDRREQ    89      /* Destination address required */\n#define EMSGSIZE        90      /* Message too long */\n#define EPROTOTYPE      91      /* Protocol wrong type for socket */\n#define ENOPROTOOPT     92      /* Protocol not available */\n#define EPROTONOSUPPORT 93      /* Protocol not supported */\n#define ESOCKTNOSUPPORT 94      /* Socket type not supported */\n#define EOPNOTSUPP      95      /* Operation not supported on transport endpoint */\n#define EPFNOSUPPORT    96      /* Protocol family not supported */\n#define EAFNOSUPPORT    97      /* Address family not supported by protocol */\n#define EADDRINUSE      98      /* Address already in use */\n#define EADDRNOTAVAIL   99      /* Cannot assign requested address */\n#define ENETDOWN        100     /* Network is down */\n#define ENETUNREACH     101     /* Network is unreachable */\n#define ENETRESET       102     /* Network dropped connection because of reset */\n#define ECONNABORTED    103     /* Software caused connection abort */\n#define ECONNRESET      104     /* Connection reset by peer */\n#define ENOBUFS         105     /* No buffer space available */\n#define EISCONN         106     /* Transport endpoint is already connected */\n#define ENOTCONN        107     /* Transport endpoint is not connected */\n#define ESHUTDOWN       108     /* Cannot send after transport endpoint shutdown */\n#define ETOOMANYREFS    109     /* Too many references: cannot splice */\n#define ETIMEDOUT       110     /* Connection timed out */\n#define ECONNREFUSED    111     /* Connection refused */\n#define EHOSTDOWN       112     /* Host is down */\n#define EHOSTUNREACH    113     /* No route to host */\n#define EALREADY        114     /* Operation already in progress */\n#define EINPROGRESS     115     /* Operation now in progress */\n#define ESTALE          116     /* Stale NFS file handle */\n#define EUCLEAN         117     /* Structure needs cleaning */\n#define ENOTNAM         118     /* Not a XENIX named type file */\n#define ENAVAIL         119     /* No XENIX semaphores available */\n#define EISNAM          120     /* Is a named type file */\n#define EREMOTEIO       121     /* Remote I/O error */\n#define EDQUOT          122     /* Quota exceeded */\n \n#define ENOMEDIUM       123     /* No medium found */\n#define EMEDIUMTYPE     124     /* Wrong medium type */\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br"),s("span",{staticClass:"line-number"},[e._v("9")]),s("br"),s("span",{staticClass:"line-number"},[e._v("10")]),s("br"),s("span",{staticClass:"line-number"},[e._v("11")]),s("br"),s("span",{staticClass:"line-number"},[e._v("12")]),s("br"),s("span",{staticClass:"line-number"},[e._v("13")]),s("br"),s("span",{staticClass:"line-number"},[e._v("14")]),s("br"),s("span",{staticClass:"line-number"},[e._v("15")]),s("br"),s("span",{staticClass:"line-number"},[e._v("16")]),s("br"),s("span",{staticClass:"line-number"},[e._v("17")]),s("br"),s("span",{staticClass:"line-number"},[e._v("18")]),s("br"),s("span",{staticClass:"line-number"},[e._v("19")]),s("br"),s("span",{staticClass:"line-number"},[e._v("20")]),s("br"),s("span",{staticClass:"line-number"},[e._v("21")]),s("br"),s("span",{staticClass:"line-number"},[e._v("22")]),s("br"),s("span",{staticClass:"line-number"},[e._v("23")]),s("br"),s("span",{staticClass:"line-number"},[e._v("24")]),s("br"),s("span",{staticClass:"line-number"},[e._v("25")]),s("br"),s("span",{staticClass:"line-number"},[e._v("26")]),s("br"),s("span",{staticClass:"line-number"},[e._v("27")]),s("br"),s("span",{staticClass:"line-number"},[e._v("28")]),s("br"),s("span",{staticClass:"line-number"},[e._v("29")]),s("br"),s("span",{staticClass:"line-number"},[e._v("30")]),s("br"),s("span",{staticClass:"line-number"},[e._v("31")]),s("br"),s("span",{staticClass:"line-number"},[e._v("32")]),s("br"),s("span",{staticClass:"line-number"},[e._v("33")]),s("br"),s("span",{staticClass:"line-number"},[e._v("34")]),s("br"),s("span",{staticClass:"line-number"},[e._v("35")]),s("br"),s("span",{staticClass:"line-number"},[e._v("36")]),s("br"),s("span",{staticClass:"line-number"},[e._v("37")]),s("br"),s("span",{staticClass:"line-number"},[e._v("38")]),s("br"),s("span",{staticClass:"line-number"},[e._v("39")]),s("br"),s("span",{staticClass:"line-number"},[e._v("40")]),s("br"),s("span",{staticClass:"line-number"},[e._v("41")]),s("br"),s("span",{staticClass:"line-number"},[e._v("42")]),s("br"),s("span",{staticClass:"line-number"},[e._v("43")]),s("br"),s("span",{staticClass:"line-number"},[e._v("44")]),s("br"),s("span",{staticClass:"line-number"},[e._v("45")]),s("br"),s("span",{staticClass:"line-number"},[e._v("46")]),s("br"),s("span",{staticClass:"line-number"},[e._v("47")]),s("br"),s("span",{staticClass:"line-number"},[e._v("48")]),s("br"),s("span",{staticClass:"line-number"},[e._v("49")]),s("br"),s("span",{staticClass:"line-number"},[e._v("50")]),s("br"),s("span",{staticClass:"line-number"},[e._v("51")]),s("br"),s("span",{staticClass:"line-number"},[e._v("52")]),s("br"),s("span",{staticClass:"line-number"},[e._v("53")]),s("br"),s("span",{staticClass:"line-number"},[e._v("54")]),s("br"),s("span",{staticClass:"line-number"},[e._v("55")]),s("br"),s("span",{staticClass:"line-number"},[e._v("56")]),s("br"),s("span",{staticClass:"line-number"},[e._v("57")]),s("br"),s("span",{staticClass:"line-number"},[e._v("58")]),s("br"),s("span",{staticClass:"line-number"},[e._v("59")]),s("br"),s("span",{staticClass:"line-number"},[e._v("60")]),s("br"),s("span",{staticClass:"line-number"},[e._v("61")]),s("br"),s("span",{staticClass:"line-number"},[e._v("62")]),s("br"),s("span",{staticClass:"line-number"},[e._v("63")]),s("br"),s("span",{staticClass:"line-number"},[e._v("64")]),s("br"),s("span",{staticClass:"line-number"},[e._v("65")]),s("br"),s("span",{staticClass:"line-number"},[e._v("66")]),s("br"),s("span",{staticClass:"line-number"},[e._v("67")]),s("br"),s("span",{staticClass:"line-number"},[e._v("68")]),s("br"),s("span",{staticClass:"line-number"},[e._v("69")]),s("br"),s("span",{staticClass:"line-number"},[e._v("70")]),s("br"),s("span",{staticClass:"line-number"},[e._v("71")]),s("br"),s("span",{staticClass:"line-number"},[e._v("72")]),s("br"),s("span",{staticClass:"line-number"},[e._v("73")]),s("br"),s("span",{staticClass:"line-number"},[e._v("74")]),s("br"),s("span",{staticClass:"line-number"},[e._v("75")]),s("br"),s("span",{staticClass:"line-number"},[e._v("76")]),s("br"),s("span",{staticClass:"line-number"},[e._v("77")]),s("br"),s("span",{staticClass:"line-number"},[e._v("78")]),s("br"),s("span",{staticClass:"line-number"},[e._v("79")]),s("br"),s("span",{staticClass:"line-number"},[e._v("80")]),s("br"),s("span",{staticClass:"line-number"},[e._v("81")]),s("br"),s("span",{staticClass:"line-number"},[e._v("82")]),s("br"),s("span",{staticClass:"line-number"},[e._v("83")]),s("br"),s("span",{staticClass:"line-number"},[e._v("84")]),s("br"),s("span",{staticClass:"line-number"},[e._v("85")]),s("br"),s("span",{staticClass:"line-number"},[e._v("86")]),s("br"),s("span",{staticClass:"line-number"},[e._v("87")]),s("br"),s("span",{staticClass:"line-number"},[e._v("88")]),s("br"),s("span",{staticClass:"line-number"},[e._v("89")]),s("br"),s("span",{staticClass:"line-number"},[e._v("90")]),s("br"),s("span",{staticClass:"line-number"},[e._v("91")]),s("br"),s("span",{staticClass:"line-number"},[e._v("92")]),s("br"),s("span",{staticClass:"line-number"},[e._v("93")]),s("br"),s("span",{staticClass:"line-number"},[e._v("94")]),s("br"),s("span",{staticClass:"line-number"},[e._v("95")]),s("br"),s("span",{staticClass:"line-number"},[e._v("96")]),s("br"),s("span",{staticClass:"line-number"},[e._v("97")]),s("br"),s("span",{staticClass:"line-number"},[e._v("98")]),s("br"),s("span",{staticClass:"line-number"},[e._v("99")]),s("br"),s("span",{staticClass:"line-number"},[e._v("100")]),s("br"),s("span",{staticClass:"line-number"},[e._v("101")]),s("br"),s("span",{staticClass:"line-number"},[e._v("102")]),s("br"),s("span",{staticClass:"line-number"},[e._v("103")]),s("br"),s("span",{staticClass:"line-number"},[e._v("104")]),s("br"),s("span",{staticClass:"line-number"},[e._v("105")]),s("br"),s("span",{staticClass:"line-number"},[e._v("106")]),s("br"),s("span",{staticClass:"line-number"},[e._v("107")]),s("br"),s("span",{staticClass:"line-number"},[e._v("108")]),s("br"),s("span",{staticClass:"line-number"},[e._v("109")]),s("br"),s("span",{staticClass:"line-number"},[e._v("110")]),s("br"),s("span",{staticClass:"line-number"},[e._v("111")]),s("br"),s("span",{staticClass:"line-number"},[e._v("112")]),s("br"),s("span",{staticClass:"line-number"},[e._v("113")]),s("br"),s("span",{staticClass:"line-number"},[e._v("114")]),s("br"),s("span",{staticClass:"line-number"},[e._v("115")]),s("br"),s("span",{staticClass:"line-number"},[e._v("116")]),s("br"),s("span",{staticClass:"line-number"},[e._v("117")]),s("br"),s("span",{staticClass:"line-number"},[e._v("118")]),s("br"),s("span",{staticClass:"line-number"},[e._v("119")]),s("br"),s("span",{staticClass:"line-number"},[e._v("120")]),s("br"),s("span",{staticClass:"line-number"},[e._v("121")]),s("br"),s("span",{staticClass:"line-number"},[e._v("122")]),s("br"),s("span",{staticClass:"line-number"},[e._v("123")]),s("br"),s("span",{staticClass:"line-number"},[e._v("124")]),s("br"),s("span",{staticClass:"line-number"},[e._v("125")]),s("br"),s("span",{staticClass:"line-number"},[e._v("126")]),s("br"),s("span",{staticClass:"line-number"},[e._v("127")]),s("br")])]),s("h4",{attrs:{id:"特别解释"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特别解释"}},[e._v("#")]),e._v(" 特别解释")]),e._v(" "),s("p",[s("code",[e._v("ENOENT")]),e._v("："),s("strong",[e._v("Error No ENTry")]),e._v("（mean No such file or directory ）"),s("a",{attrs:{href:"https://stackoverflow.com/questions/19902828/why-does-enoent-mean-no-such-file-or-directory",target:"_blank",rel:"noopener noreferrer"}},[e._v("解释来源"),s("OutboundLink")],1)])])}),[],!1,null,null,null);n.default=i.exports}}]);