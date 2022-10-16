package lotes

import "app/core/models/database"

type GetSectoresClient struct{

}

func (o *GetSectoresClient) Check() string{
	return ""
}

type GetSectoresServer struct{
	ResponseCode	int
	ResponseString	string
	Info			[]string
}

func (o* GetSectoresServer) AddItem(sector database.Lotes){
	o.Info = append(o.Info,sector.Sector)
}
